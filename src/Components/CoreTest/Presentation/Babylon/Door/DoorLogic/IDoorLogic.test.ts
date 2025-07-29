import IDoorLogic from "../../../../../Core/Presentation/Babylon/Door/DoorLogic/IDoorLogic";

// Since IDoorLogic is an interface, we test with a mock implementation
class MockDoorLogic implements IDoorLogic {
  openCallback?: () => void;
  closeCallback?: () => void;
  avatarCloseCallback?: () => void;
  avatarFarCallback?: () => void;

  open(onAnimationEnd?: () => void): void {
    this.openCallback = onAnimationEnd;
    if (onAnimationEnd) {
      onAnimationEnd();
    }
  }

  close?(): void {
    if (this.closeCallback) {
      this.closeCallback();
    }
  }

  avatarClose?(): void {
    if (this.avatarCloseCallback) {
      this.avatarCloseCallback();
    }
  }

  avatarFar?(): void {
    if (this.avatarFarCallback) {
      this.avatarFarCallback();
    }
  }
}

describe("IDoorLogic", () => {
  let systemUnderTest: IDoorLogic;

  beforeEach(() => {
    systemUnderTest = new MockDoorLogic();
  });

  test("open method is defined and can be called", () => {
    expect(typeof systemUnderTest.open).toBe("function");

    expect(() => {
      systemUnderTest.open();
    }).not.toThrow();
  });

  test("open method can be called with callback", () => {
    const callback = jest.fn();

    systemUnderTest.open(callback);

    expect(callback).toHaveBeenCalled();
  });

  test("open method can be called without callback", () => {
    expect(() => {
      systemUnderTest.open();
    }).not.toThrow();
  });

  test("close method is optional and can be called if implemented", () => {
    if (systemUnderTest.close) {
      expect(typeof systemUnderTest.close).toBe("function");

      expect(() => {
        systemUnderTest.close!();
      }).not.toThrow();
    } else {
      expect(systemUnderTest.close).toBeUndefined();
    }
  });

  test("avatarClose method is optional and can be called if implemented", () => {
    if (systemUnderTest.avatarClose) {
      expect(typeof systemUnderTest.avatarClose).toBe("function");

      expect(() => {
        systemUnderTest.avatarClose!();
      }).not.toThrow();
    } else {
      expect(systemUnderTest.avatarClose).toBeUndefined();
    }
  });

  test("avatarFar method is optional and can be called if implemented", () => {
    if (systemUnderTest.avatarFar) {
      expect(typeof systemUnderTest.avatarFar).toBe("function");

      expect(() => {
        systemUnderTest.avatarFar!();
      }).not.toThrow();
    } else {
      expect(systemUnderTest.avatarFar).toBeUndefined();
    }
  });

  test("interface compliance with complete implementation", () => {
    const completeImplementation = new MockDoorLogic();

    // Set up callbacks to verify they're called
    completeImplementation.closeCallback = jest.fn();
    completeImplementation.avatarCloseCallback = jest.fn();
    completeImplementation.avatarFarCallback = jest.fn();

    // Test all methods
    const openCallback = jest.fn();
    completeImplementation.open(openCallback);
    expect(openCallback).toHaveBeenCalled();

    if (completeImplementation.close) {
      completeImplementation.close();
      expect(completeImplementation.closeCallback).toHaveBeenCalled();
    }

    if (completeImplementation.avatarClose) {
      completeImplementation.avatarClose();
      expect(completeImplementation.avatarCloseCallback).toHaveBeenCalled();
    }

    if (completeImplementation.avatarFar) {
      completeImplementation.avatarFar();
      expect(completeImplementation.avatarFarCallback).toHaveBeenCalled();
    }
  });

  test("interface compliance with minimal implementation", () => {
    // Test with implementation that only has required methods
    class MinimalDoorLogic implements IDoorLogic {
      open(onAnimationEnd?: () => void): void {
        // Minimal implementation
      }
    }

    const minimalImplementation = new MinimalDoorLogic();

    expect(typeof minimalImplementation.open).toBe("function");
    expect((minimalImplementation as any).close).toBeUndefined();
    expect((minimalImplementation as any).avatarClose).toBeUndefined();
    expect((minimalImplementation as any).avatarFar).toBeUndefined();

    expect(() => {
      minimalImplementation.open();
    }).not.toThrow();
  });
});
