import CookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";

describe("CookieModalController", () => {
  let systemUnderTest: CookieModalController;

  beforeEach(() => {
    systemUnderTest = new CookieModalController();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("accept", () => {
    test("should store 'accepted' in localStorage", () => {
      systemUnderTest.accept();

      expect(localStorage.getItem("adler_cookie_consent")).toBe("accepted");
    });

    test("should store timestamp in localStorage", () => {
      const beforeTimestamp = Date.now();
      systemUnderTest.accept();
      const afterTimestamp = Date.now();

      const storedTimestamp = localStorage.getItem(
        "adler_cookie_consent_timestamp",
      );
      expect(storedTimestamp).toBeTruthy();
      const timestamp = parseInt(storedTimestamp!);
      expect(timestamp).toBeGreaterThanOrEqual(beforeTimestamp);
      expect(timestamp).toBeLessThanOrEqual(afterTimestamp);
    });
  });

  describe("decline", () => {
    test("should store 'declined' in localStorage", () => {
      systemUnderTest.decline();

      expect(localStorage.getItem("adler_cookie_consent")).toBe("declined");
    });

    test("should store timestamp in localStorage", () => {
      const beforeTimestamp = Date.now();
      systemUnderTest.decline();
      const afterTimestamp = Date.now();

      const storedTimestamp = localStorage.getItem(
        "adler_cookie_consent_timestamp",
      );
      expect(storedTimestamp).toBeTruthy();
      const timestamp = parseInt(storedTimestamp!);
      expect(timestamp).toBeGreaterThanOrEqual(beforeTimestamp);
      expect(timestamp).toBeLessThanOrEqual(afterTimestamp);
    });
  });

  describe("getConsent", () => {
    test("should return null when no consent is stored", () => {
      expect(CookieModalController.getConsent()).toBeNull();
    });

    test("should return 'accepted' when user accepted", () => {
      systemUnderTest.accept();
      expect(CookieModalController.getConsent()).toBe("accepted");
    });

    test("should return 'declined' when user declined", () => {
      systemUnderTest.decline();
      expect(CookieModalController.getConsent()).toBe("declined");
    });
  });

  describe("hasConsent", () => {
    test("should return false when no consent is stored", () => {
      expect(CookieModalController.hasConsent()).toBe(false);
    });

    test("should return true when user accepted", () => {
      systemUnderTest.accept();
      expect(CookieModalController.hasConsent()).toBe(true);
    });

    test("should return false when user declined", () => {
      systemUnderTest.decline();
      expect(CookieModalController.hasConsent()).toBe(false);
    });
  });

  describe("hasDeclined", () => {
    test("should return false when no consent is stored", () => {
      expect(CookieModalController.hasDeclined()).toBe(false);
    });

    test("should return false when user accepted", () => {
      systemUnderTest.accept();
      expect(CookieModalController.hasDeclined()).toBe(false);
    });

    test("should return true when user declined", () => {
      systemUnderTest.decline();
      expect(CookieModalController.hasDeclined()).toBe(true);
    });
  });

  describe("resetConsent", () => {
    test("should remove consent from localStorage", () => {
      systemUnderTest.accept();
      CookieModalController.resetConsent();

      expect(localStorage.getItem("adler_cookie_consent")).toBeNull();
      expect(localStorage.getItem("adler_cookie_consent_timestamp")).toBeNull();
    });
  });
});
