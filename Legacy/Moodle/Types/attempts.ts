declare namespace attempts {
  type attemptMeta = {
    id: number;
    quiz: number;
    userid: number;
    attempt: number;
    uniqueid: number;
    layout: string;
    currentpage: number;
    preview: number;
    state: string;
    timestart: number;
    timefinish: number;
    timemodified: number;
    timemodifiedoffline: number;
    timecheckstate: number;
    sumgrades: number;
  };

  type questionsMeta = {
    slot: number;
    type: string;
    page: number;
    html: string;
    responsefileareas: any[]; // TODO: define
    sequencecheck: number;
    lastactiontime: number;
    hasautosavedstep: false;
    flagged: false;
    number: number;
    status: string;
    blockedbyprevious: false;
    maxmark: number;
    settings: string;
  };

  namespace get_user_attempts {
    type args = {
      quizid: number;
      userid: number;
      status?: "all" | "finished" | "unfinished";
      includepreviews?: boolean;
    };
    type response = {
      attempts: attemptMeta[];
      warnings: string[];
    };
  }

  namespace get_attempt_data {
    type args = {
      attemptid: number;
      page: number;
      preflightdata?: string[];
    };

    type response = {
      attempt: attemptMeta;
      messages: string[];
      nextPage: number;
      questions: questionsMeta[];
      warnings: string[];
    };
  }

  namespace start_attempt {
    type args = {
      quizid: number;
      preflightdata?: string[];
      forcenew?: boolean;
    };

    type response = {
      attempt: attemptMeta;
      warnings: string[];
    };
  }

  namespace process_attempt {
    type args = {
      attemptid: number;
      data: any; // TODO: define
      finishattempt?: boolean;
      timeup?: boolean;
      preflightdata?: string[];
    };

    type response = {
      state: "inprogress" | "finished" | "abandoned" | "overdue";
      warnings: [];
    };
  }

  namespace get_attempt_review {
    type args = {
      attemptid: number;
      page?: number;
    };

    type response = {
      grade: number;
      attempt: attemptMeta;
      additionaldata: any[]; // TODO: define
      questions: questionsMeta[];
    };
  }
}

export default attempts;
