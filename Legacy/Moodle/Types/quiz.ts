declare namespace quiz {
  namespace get_quizzes_by_courses {
    type args = {
      courseids: number[];
    };

    type response = {
      quizzes: {
        id: number;
        course: number;
        coursemodule: number;
        name: string;
        intro: string;
        introformat: number;
        introfiles: [];
        timeopen: number;
        timeclose: number;
        timelimit: number;
        overduehandling: string;
        graceperiod: number;
        preferredbehaviour: string;
        canredoquestions: number;
        attempts: number;
        attemptonlast: number;
        grademethod: number;
        decimalpoints: number;
        questiondecimalpoints: number;
        reviewattempt: number;
        reviewcorrectness: number;
        reviewmarks: number;
        reviewspecificfeedback: number;
        reviewgeneralfeedback: number;
        reviewrightanswer: number;
        reviewoverallfeedback: number;
        questionsperpage: number;
        navmethod: string;
        shuffleanswers: number;
        sumgrades: number;
        grade: number;
        timecreated: number;
        timemodified: number;
        password: string;
        subnet: string;
        browsersecurity: string;
        delay1: number;
        delay2: number;
        showuserpicture: number;
        showblocks: number;
        completionattemptsexhausted: number;
        completionpass: number;
        allowofflineattempts: number;
        autosaveperiod: number;
        hasfeedback: number;
        hasquestions: number;
        section: number;
        visible: number;
        groupmode: number;
        groupingid: number;
      }[];
      warnings: string[];
    };
  }
}

export default quiz;
