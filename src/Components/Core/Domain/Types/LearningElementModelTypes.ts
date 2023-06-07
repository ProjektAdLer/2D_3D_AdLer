enum TextElementModelTypes {
  Bookshelf1 = "l_text_bookshelf_1",
  Bookshelf2 = "l_text_bookshelf_2",
}

enum ImageElementModelTypes {
  // TODO: rename to l_image_... when models are updated
  Painting1 = "l_picture_painting_1",
  Painting2 = "l_picture_painting_2",
  PaintingEasel = "l_picture_paintingeasel_1",
}

enum VideoElementModelTypes {
  Television = "l_video_television_1",
}

enum PdfElementModelTypes {}

enum H5pElementModelTypes {
  Backboard = "l_h5p_backboard_1",
  DeskPC = "l_h5p_deskpc_1",
  DrawingTable = "l_h5p_drawingtable_1",
  SlotMachine = "l_h5p_slotmachine_1",
}

enum NoElementModelTypes {
  None = "",
}

/** 
 Pseudo-nested enum to reference all possible members of the element model enums.
 */
export const LearningElementModelTypeEnums = {
  TextElementModelTypes: TextElementModelTypes,
  ImageElementModelTypes: ImageElementModelTypes,
  VideoElementModelTypes: VideoElementModelTypes,
  PdfElementModelTypes: PdfElementModelTypes,
  H5pElementModelTypes: H5pElementModelTypes,
  NoElementModelTypes: NoElementModelTypes,
};

/**
 Type of a learning element model.
  */
export type LearningElementModel =
  | TextElementModelTypes
  | ImageElementModelTypes
  | VideoElementModelTypes
  | PdfElementModelTypes
  | H5pElementModelTypes
  | NoElementModelTypes;
