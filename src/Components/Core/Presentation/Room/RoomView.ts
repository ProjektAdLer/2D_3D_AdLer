import {
  Scene,
  Mesh,
  VertexData,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import { injectable } from "inversify";
import IRoomView from "./IRoomView";
import RoomViewModel from "./RoomViewModel";
import floorTexture from "../../../../Assets/wooden_floor.png";

@injectable()
export default class RoomView implements IRoomView {
  private viewModel: RoomViewModel;

  set ViewModel(newViewModel: RoomViewModel) {
    this.viewModel = newViewModel;
  }

  public displayRoom(): void {
    this.createWalls();
    this.createFloor();
  }

  private createFloor(): void {
    if (!this.viewModel)
      throw new Error(
        "ViewModel not set. Use the ViewModel setter before calling this method"
      );

    var floorIndices = this.createFloorIndices();
    var floorPositions = this.createFloorPositions();

    var floorMesh = new Mesh("Floor", this.viewModel.scene.Value);
    var normals = [] as number[];
    var uvs = [0, 1, 0, 0, 1, 0, 1, 1];
    VertexData.ComputeNormals(floorPositions, floorIndices, normals);
    var vertexData = new VertexData();
    vertexData.positions = floorPositions;
    vertexData.indices = floorIndices;
    vertexData.normals = normals;
    vertexData.uvs = uvs;
    vertexData.applyToMesh(floorMesh);

    var floorMaterial = new StandardMaterial(
      "floorMaterial",
      this.viewModel.scene.Value
    );
    floorMaterial.diffuseTexture = new Texture(
      floorTexture,
      this.viewModel.scene.Value
    );
    floorMesh.material = floorMaterial;
  }

  private createWalls(): void {
    if (!this.viewModel)
      throw new Error(
        "ViewModel not set. Use the ViewModel setter before calling this method"
      );

    var positions = this.createRoomPositions();
    var wallIndices = this.createWallIndices();

    var wallMesh = new Mesh("Walls", this.viewModel.scene.Value);
    var normals = [] as number[];
    VertexData.ComputeNormals(positions, wallIndices, normals);
    var vertexData = new VertexData();
    vertexData.positions = positions;
    vertexData.indices = wallIndices;
    vertexData.normals = normals;
    vertexData.applyToMesh(wallMesh);
    wallMesh.convertToFlatShadedMesh();

    var wallMaterial = new StandardMaterial(
      "wallMaterial",
      this.viewModel.scene.Value
    );
    wallMaterial.diffuseColor = this.viewModel.wallColor.Value;
    wallMesh.material = wallMaterial;
  }

  private createFloorPositions() {
    var roomWidth = this.viewModel.roomWidth.Value / 2;
    var roomLength = this.viewModel.roomLength.Value / 2;
    var baseHeight = this.viewModel.baseHeight.Value;
    var wallThickness = this.viewModel.wallThickness.Value;
    return [
      roomWidth + wallThickness,
      baseHeight,
      roomLength + wallThickness, // Same as: 44 north east outer floor
      -roomWidth - wallThickness,
      baseHeight,
      roomLength + wallThickness, // Same as: 49 north west outer floor
      -roomWidth - wallThickness,
      baseHeight,
      -roomLength - wallThickness, // Same as: 54 south west outer floor
      roomWidth + wallThickness,
      baseHeight,
      -roomLength - wallThickness, // Same as: 59 south east outer floor
    ];
  }

  private createRoomPositions() {
    var roomWidth = this.viewModel.roomWidth.Value / 2;
    var roomLength = this.viewModel.roomLength.Value / 2;
    var baseHeight = this.viewModel.baseHeight.Value;
    var roomHeight = this.viewModel.roomHeight.Value;
    var doorWidth = this.viewModel.doorWidth.Value / 2;
    var doorHeight = this.viewModel.doorHeight.Value;
    var wallThickness = this.viewModel.wallThickness.Value;
    return [
      roomWidth,
      baseHeight,
      roomLength, // 0 north east, ground
      roomWidth,
      baseHeight,
      -roomLength, // 1 south east, ground
      -roomWidth,
      baseHeight,
      -roomLength, // 2 south west, ground
      -roomWidth,
      baseHeight,
      roomLength, // 3 north west, ground
      roomWidth,
      baseHeight + roomHeight,
      roomLength, // 4 north east, ceiling
      doorWidth,
      baseHeight,
      roomLength, // 5 northern floor, east doorpoint
      doorWidth,
      baseHeight + doorHeight,
      roomLength, // 6 northern wall, east doorpoint
      doorWidth,
      baseHeight + roomHeight,
      roomLength, // 7 northern ceiling, east doorpoint
      -doorWidth,
      baseHeight,
      roomLength, // 8 northern floor, west doorpoint
      -doorWidth,
      baseHeight + doorHeight,
      roomLength, // 9 northern wall, west doorpoint
      -doorWidth,
      baseHeight + roomHeight,
      roomLength, // 10 northern ceiling, west doorpoint
      -roomWidth,
      baseHeight + roomHeight,
      roomLength, // 11 north west ceiling
      -roomWidth,
      baseHeight,
      doorWidth, // 12 western floor, north doorpoint
      -roomWidth,
      baseHeight + doorHeight,
      doorWidth, // 13 western wall, north doorpoint
      -roomWidth,
      baseHeight + roomHeight,
      doorWidth, // 14 western ceiling, north doorpoint
      -roomWidth,
      baseHeight,
      -doorWidth, // 15 western floor, south doorpoint
      -roomWidth,
      baseHeight + doorHeight,
      -doorWidth, // 16 western wall, south doorpoint
      -roomWidth,
      baseHeight + roomHeight,
      -doorWidth, // 17 western ceiling, south doorpoint
      -roomWidth,
      baseHeight + roomHeight,
      -roomLength, // 18 south west ceiling
      -doorWidth,
      baseHeight,
      -roomLength, // 19 southern floor, west doorpoint
      -doorWidth,
      baseHeight + doorHeight,
      -roomLength, // 20 southern wall, west doorpoint
      -doorWidth,
      baseHeight + roomHeight,
      -roomLength, // 21 southern ceiling, west doorpoint
      doorWidth,
      baseHeight,
      -roomLength, // 22 southern floor, east doorpoint
      doorWidth,
      baseHeight + doorHeight,
      -roomLength, // 23 southern wall, east doorpoint
      doorWidth,
      baseHeight + roomHeight,
      -roomLength, // 24 southern ceiling, east doorpoint
      roomWidth,
      baseHeight + roomHeight,
      -roomLength, // 25 south east ceiling
      roomWidth,
      baseHeight,
      -doorWidth, // 26 eastern floor, south doorpoint
      roomWidth,
      baseHeight + doorHeight,
      -doorWidth, // 27 eastern wall, south doorpoint
      roomWidth,
      baseHeight + roomHeight,
      -doorWidth, // 28 eastern ceiling, south doorpoint
      roomWidth,
      baseHeight,
      doorWidth, // 29 eastern floor, north doorpoint
      roomWidth,
      baseHeight + doorHeight,
      doorWidth, // 30 eastern wall, north doorpoint
      roomWidth,
      baseHeight + roomHeight,
      doorWidth, // 31 eastern ceiling, north doorpoint

      roomWidth + wallThickness,
      baseHeight + roomHeight,
      roomLength + wallThickness, // 32 north east outer ceiling
      doorWidth,
      baseHeight + roomHeight,
      roomLength + wallThickness, // 33 northern outer ceiling, east doorpoint
      -doorWidth,
      baseHeight + roomHeight,
      roomLength + wallThickness, // 34 northern outer ceiling, west doorpoint
      -roomWidth - wallThickness,
      baseHeight + roomHeight,
      roomLength + wallThickness, // 35 north west outer ceiling
      -roomWidth - wallThickness,
      baseHeight + roomHeight,
      doorWidth, // 36 western outer ceiling, north doorpoint
      -roomWidth - wallThickness,
      baseHeight + roomHeight,
      -doorWidth, // 37 western outer ceiling, south doorpoint
      -roomWidth - wallThickness,
      baseHeight + roomHeight,
      -roomLength - wallThickness, // 38 south west outer ceiling
      -doorWidth,
      baseHeight + roomHeight,
      -roomLength - wallThickness, // 39 southern outer ceiling, west doorpoint
      doorWidth,
      baseHeight + roomHeight,
      -roomLength - wallThickness, // 40 southern outer ceiling, east doorpoint
      roomWidth + wallThickness,
      baseHeight + roomHeight,
      -roomLength - wallThickness, // 41 south east outer ceiling
      roomWidth + wallThickness,
      baseHeight + roomHeight,
      -doorWidth, // 42 eastern outer ceiling, south doorpoint
      roomWidth + wallThickness,
      baseHeight + roomHeight,
      doorWidth, // 43 eastern outer ceiling, north doorpoint
      roomWidth + wallThickness,
      baseHeight,
      roomLength + wallThickness, // 44 north east outer floor
      doorWidth,
      baseHeight,
      roomLength + wallThickness, // 45 north outer floor, east doorpost
      doorWidth,
      baseHeight + doorHeight,
      roomLength + wallThickness, // 46 north outer wall, east doorpost
      -doorWidth,
      baseHeight + doorHeight,
      roomLength + wallThickness, // 47 north outer wall, west doorpost
      -doorWidth,
      baseHeight,
      roomLength + wallThickness, // 48 north outer floor, west doorpost
      -roomWidth - wallThickness,
      baseHeight,
      roomLength + wallThickness, // 49 north west outer floor
      -roomWidth - wallThickness,
      baseHeight,
      doorWidth, // 50 western outer floor, north doorpost
      -roomWidth - wallThickness,
      baseHeight + doorHeight,
      doorWidth, // 51 western outer wall, north doorpost
      -roomWidth - wallThickness,
      baseHeight + doorHeight,
      -doorWidth, // 52 western outer wall, south doorpost
      -roomWidth - wallThickness,
      baseHeight,
      -doorWidth, // 53 western outer floor, south doorpost
      -roomWidth - wallThickness,
      baseHeight,
      -roomLength - wallThickness, // 54 south west outer floor
      -doorWidth,
      baseHeight,
      -roomLength - wallThickness, // 55 southern outer floor, west doorpost
      -doorWidth,
      baseHeight + doorHeight,
      -roomLength - wallThickness, // 56 southern outer wall, west doorpost
      doorWidth,
      baseHeight + doorHeight,
      -roomLength - wallThickness, // 57 southern outer wall, east doorpost
      doorWidth,
      baseHeight,
      -roomLength - wallThickness, // 58 southern outer floor, east doorpost
      roomWidth + wallThickness,
      baseHeight,
      -roomLength - wallThickness, // 59 south east outer floor
      roomWidth + wallThickness,
      baseHeight,
      -doorWidth, // 60, eastern outer floor, south doorpost
      roomWidth + wallThickness,
      baseHeight + doorHeight,
      -doorWidth, // 61, eastern outer wall, south doorpost
      roomWidth + wallThickness,
      baseHeight + doorHeight,
      doorWidth, // 62, eastern outer wall, north doorpost
      roomWidth + wallThickness,
      baseHeight,
      doorWidth, // 63, eastern outer floor, north doorpost
    ];
  }

  private createFloorIndices() {
    return [0, 1, 2, 2, 3, 0];
  }

  private createWallIndices() {
    return [
      0,
      4,
      5,
      4,
      7,
      5,
      5,
      7,
      8,
      7,
      10,
      8,
      8,
      10,
      11,
      8,
      11,
      3, // northern Wall
      3,
      11,
      12,
      12,
      11,
      14,
      14,
      15,
      12,
      14,
      17,
      15,
      17,
      2,
      15,
      17,
      18,
      2, // western wall
      2,
      21,
      19,
      2,
      18,
      21,
      21,
      24,
      19,
      19,
      24,
      22,
      22,
      24,
      25,
      25,
      1,
      22, // southern wall
      1,
      25,
      28,
      1,
      28,
      26,
      26,
      28,
      29,
      29,
      28,
      31,
      29,
      31,
      0,
      0,
      31,
      4, // eastern wall
      32,
      35,
      11,
      32,
      11,
      4, // northern wall thickness
      35,
      38,
      18,
      35,
      18,
      11, // western wall thickness
      38,
      41,
      25,
      38,
      25,
      18, // southern wall thickness
      41,
      32,
      4,
      41,
      4,
      25, // eastern wall thickness
      44,
      45,
      32,
      45,
      33,
      32,
      45,
      48,
      33,
      48,
      34,
      33,
      49,
      34,
      48,
      49,
      35,
      34, // northern outer wall
      49,
      50,
      35,
      50,
      36,
      35,
      50,
      53,
      36,
      53,
      37,
      36,
      53,
      54,
      37,
      54,
      38,
      37, // western outer wall
      38,
      54,
      55,
      55,
      39,
      38,
      55,
      58,
      39,
      58,
      40,
      39,
      58,
      59,
      40,
      59,
      41,
      40, // southern outer wall
      59,
      60,
      41,
      60,
      42,
      41,
      60,
      43,
      42,
      60,
      63,
      43,
      63,
      44,
      43,
      44,
      32,
      43, // eastern outer wall
    ];
  }
}
