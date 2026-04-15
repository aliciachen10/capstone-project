/**
 * Central question bank: prompts, choices, and stat deltas.
 * Add new questions to `QUESTION_ORDER` and the `questions` record.
 */

export type Choice = {
  /** Stable id for analytics / future branching */
  id: string;
  label: string;
  energyDelta: number;
  successDelta: number;
  consequenceText: string;
};

export type Question = {
  id: string;
  /** Shown in the green narrative box */
  prompt: string;
  choices: Choice[];
};

export const questions: Record<string, Question> = {
  "consultancy-project": {
    id: "consultancy-project",
    prompt:
      "While you are in school, you are working at a small consultancy for technology projects and are handed a challenging project where you have to do all the work from scratch (no one has done any of this stuff before, so there are no answers or guidance online, and AI doesn’t help). During this time, you’re still balancing classes and seeing patients at your site. What do you do?",
    choices: [
      {
        id: "quit",
        label: "Quit the project",
        energyDelta: 15,
        successDelta: -20,
        consequenceText:
          "you told your boss you couldn't keep working on the project anymore because you didn't have the bandwidth to continue. Although you imagine he is disappointed, he doesn't show it. He actually says that he needs the consulting hours himself and he is willing to work on it in lieu of your availability. Despite this, you know you are losing out on adding additional savings and an opportunity to keep your technical skills sharp and stay connected to technology sector, which you plan to do after you finish graduate school. But as a result, despite increasing 15 energy, you lose 20 success.",
      },
      {
        id: "time-box",
        label:
          "Keep working on the project, but time box what you work on",
        energyDelta: -15,
        successDelta: -10,
        consequenceText:
          "You continue to work on the project. However, because it is so time consuming and technically challenging, you become more and more stressed (you lose 15 energy) and you actually become less effective at both school and the project (you lose 10 success).",
      },
      {
        id: "delay-summer",
        label:
          "Try to delay your work on the project until the summer — when you’ll have more time to do the work",
        energyDelta: 0,
        successDelta: -10,
        consequenceText:
          "You ask your boss if you can work on the project in the summer instead, especially since the client didn't specify a clear deadline. Your boss understands why you need to focus on school, but of course may be masking some disappointment. However, he wants to get the work done for the client within a few weeks, and volunteers himself to take the work off your plate, citing his personal need for more consulting hours this coming month. You lose no energy but some success, since you are not able to take credit for the completion of the project.",
      },
      {
        id: "skip-classes",
        label:
          "Try to work class around the project — skip a few classes here and there, and try to spend less time on assignments and readings on the weekend",
        energyDelta: -15,
        successDelta: -10,
        consequenceText:
          "You stretch yourself too thin by sacrificing class time and coursework, and both your wellness and performance take a hit. This choice drains your energy and lowers your effectiveness across school and work.",
      },
    ],
  },
  "roommate-conflict": {
    id: "roommate-conflict",
    prompt:
      "You just moved into your grad student housing on the corner of Polo & Friendship (only about a 15 minute walk from where classes are in Carswell). Things seem to be going well, except for the fact that one of your roommates seems to be extremely particular about how things are in the house. She constantly texts the group chat pictures of misplaced things and seems to be annoyed and angry when other people are in the kitchen when she is around. you have had several direct conversations with her sharing each others’ expectations about the space, and addressing her feelings about what is going on, attempting to take responsibility for anything that was due to your behavior, but this does not seem to have solved the problem. The most alarming thing is that once you left your clothes in the washer, and she took them out in the morning and stuck them in the freezer so that they were a frozen block when you checked for them in the morning. What do you do?",
    choices: [
      {
        id: "move-out",
        label:
          "Decide to move out immediately. This kind of behavior is unacceptable.",
        energyDelta: 10,
        successDelta: -10,
        consequenceText:
          "although moving out takes up a lot more energy and several hundreds of dollars, including sending in a several hundred dollar deposit for an early move out to grad student housing, you actually feel relief and a sense of lightness after moving to a new apartment, where you'll have more peace and your own space. your partner can also come to visit. however, a part of you does feel a bit guilty, like you've failed to deal well with a situation thrown at you. you lose 10 success.",
      },
      {
        id: "avoid-roommate",
        label:
          "Stay in the apartment, but avoid interacting with her any further, recognizing that you will trade short term chaos of moving for some long term stress",
        energyDelta: -20,
        successDelta: 0,
        consequenceText:
          "although you don't have to face the failure of having to move away so quickly, avoiding your roommate drains you and makes you feel extreme feelings of dread before and during your time at home. you fear aggressive confrontations with her and texts showing all the \"wrong\" things that you and your other roommate have done.",
      },
      {
        id: "work-through-conflict",
        label:
          "Stay in the apartment, and continue to work out conflict with her. Maybe seek some support from the third roommate, who seems relatively reasonable and friendly, and also shares some of your concerns.",
        energyDelta: -20,
        successDelta: 5,
        consequenceText:
          "although you feel proud (+5 success) that you are able to try to work with your roommate where she is, you lose a significant amount of energy from constantly needing to handle and respond to your roommate's needs and requirements, which are clearly different from yours.",
      },
    ],
  },
  "intern-office-noise": {
    id: "intern-office-noise",
    prompt:
      "You work in an office with 8 other interns. On Mondays and Wednesdays, most interns are in and they like to chat when you are around. Remember your score on the SPS scale. Constant background noise is exhausting for you and puts you on edge. What do you do?",
    choices: [
      {
        id: "stay-change-nothing",
        label: "Stay in the office where you are, and change nothing",
        energyDelta: -20,
        successDelta: -10,
        consequenceText:
          "you keep up appearances but you feel absolutely exhausted. you lose some success, but not a lot because at least everyone feels like you're normal.",
      },
      {
        id: "noise-cancelling",
        label:
          "Stay in the office where you are, and put on noise blocking earmuffs or noise cancelling headphones",
        energyDelta: -10,
        successDelta: -5,
        consequenceText:
          "You keep up appearances, as you are bodily present when you arrive at the office. however, occasionally certain interns will still tap your shoulder or get your attention when they need help, and you can still hear some noise from underneath your noise cancelling headphones.",
      },
      {
        id: "library-or-break-room",
        label:
          "Start filing your notes in the library or in the break room",
        energyDelta: 10,
        successDelta: -5,
        consequenceText:
          "you definitely lose out on building relationships that start from small talk that interns engage in in the office. You also worry that your supervisor might see that you're not engaging socially like the others. However, you actually feel more refreshed and rejuvenated being in another environment that is quiet and still, and this helps you get rest in between patients. Later, your supervisor privately admits to you that she has already guessed that you need some more silence or auditory refresh time, and that she supports you in this endeavor.",
      },
      {
        id: "office-social-bathroom-breaks",
        label:
          "Stay in the office, and engage in conversation occasionally to show that you still care about others, but take some bathroom breaks to refresh yourself",
        energyDelta: -15,
        successDelta: -5,
        consequenceText:
          "despite your best efforts to refresh yourself, you are still absolutely exhausted by the end of each day due to the consistent stimulation of conversations. Bathroom breaks just don't cut it -- you need more extended periods of silence during the day to refresh, especially after difficult sessions with patients.",
      },
    ],
  },
  "aspen-fellowship-application": {
    id: "aspen-fellowship-application",
    prompt:
      "You are interested in applying for a social impact policy fellowship at the Aspen Institute to learn how to do some behavioral healthcare policy work after graduation, as your dream has always been to impact the behavioral health space at a large scale, particularly for improving the quality of care that providers deliver. The fellowship pays $7k for 6 weeks, with 2 weeks in person in San Francisco. However, the application is due tonight, and you just did class from 9am-4:45pm and had a stressful conversation for 2 hours with someone you have been dating. It is now 7pm and the application is due at midnight. the questions on the application are extremely detailed, and some involve writing a memo to a thought leader in the space as a policy proposal, talking about what you want to get out of the program, and so on and so forth. What do you do?",
    choices: [
      {
        id: "apply-tough-friday",
        label:
          "Apply anyway knowing that the next day at your site is going to be a wash. maybe you will ask to take on fewer patients that day",
        energyDelta: -10,
        successDelta: 10,
        consequenceText:
          "Friday is exhausting for you, but three weeks later, you get an email. You are shocked to see that the email is from the Aspen Institute asking you if you want to interview. You take the interview, and at the end are surprised that nearly all the questions are behavioral. Two weeks later, you hear back - you've been accepted, and are going to San Francisco this summer! You gain 10 success points.",
      },
      {
        id: "apply-sick-day",
        label:
          "Apply anyway, and decide that you will not go to your site the next day. You will be \"sick.\"",
        energyDelta: -5,
        successDelta: 5,
        consequenceText:
          "You feel guilty all Friday that you didn't go in, and regret that you don't have the opportunity to pick up some patients at the hospital. Luckily, there are a few full-time staff who are in on Fridays who can take the patients you missed, and as most of your sessions are single sessions, you do not have an existing patient load that you need to cancel for. However, three weeks later, you get an email. You are shocked to see that the email is from the Aspen Institute asking you if you want to interview. You take the interview, and at the end are surprised that nearly all the questions are behavioral. Two weeks later, you hear back - you've been accepted, and are going to San Francisco this summer! You gain 5 success points.",
      },
      {
        id: "skip-pessimistic",
        label:
          "Do not apply. It's unlikely you will get the opportunity anyway because usually, over 400 people apply and there are only 15 spots.",
        energyDelta: 0,
        successDelta: -20,
        consequenceText:
          "you feel regretful. Although you saved your energy after an especially chaotic evening, you feel regretful that you let go of the opportunity and you wonder what would have happened if you'd just taken the chance for that night.",
      },
      {
        id: "skip-self-care",
        label:
          "Do not apply. Instead, do something relaxing, like some self care. take a bath with epsom salts. Go on a nice, long walk. Go to the steam room or the sauna or hot tub at the YMCA and just chill there for an hour or two.",
        energyDelta: 10,
        successDelta: -20,
        consequenceText:
          "you feel relaxed, but regretful. Although you saved your energy after an especially chaotic evening, you feel regretful that you let go of the opportunity and you wonder what would have happened if you'd just taken the chance for that night.",
      },
    ],
  },
  "theory-case-tape-crisis": {
    id: "theory-case-tape-crisis",
    prompt:
      "You have had a super busy week and have been at your site over the number of hours that you usually are. In the past week, you've had to write up two papers and it's 7pm. You are feeling about ready to get started getting ready for bed and be in bed reading a book in two hours due to the level of work and exhaustion. You are just bone tired and ready for the semester to be over. But you get the weird feeling something is wrong. You check your email. Looks like you were right: Your university supervisor has emailed you and tells you that you are presenting your theory case presentation tomorrow and she still hasn't received a tape from you yet. What do you do?",
    choices: [
      {
        id: "wrong-week-follow-up",
        label:
          "Tell her that you were under the impression that your presentation was the following week and that you won't be able to get a tape in time. But work hard to get it in the following week.",
        energyDelta: 0,
        successDelta: -10,
        consequenceText:
          "although you save your energy and get some sleep, the relationship with your supervisor isn't going well. You've already missed a couple classes this semester due to illness, including a weeks-long illness that left you hacking and with swollen lymph nodes. You lose 10 success points.",
      },
      {
        id: "scramble-full-prep",
        label:
          "Scramble to find a tape, write the recording review form, write up a few slides for your chosen theoretical orientation, and turn it all in before 9pm so that your supervisor can listen to it on the drive over and you can still present.",
        energyDelta: -10,
        successDelta: 0,
        consequenceText:
          "you save the relationship with your supervisor, and are able to present everything in time. the tape works well to illustrate the theoretical orientation of your choosing. Despite this, you're just exhausted and need some time to yourself after supervision to chill. You get some chick-fil-a as a reward.",
      },
      {
        id: "minimal-prep-wing-it",
        label:
          "Find a tape, write the recording review form, and skim the tape to find a 10 minute segment you can present on. Wing the presentation, don't worry about the rest of the tape, and hope that your supervisor appreciates the last minute effort. Go to bed on time and get some rest.",
        energyDelta: -5,
        successDelta: -5,
        consequenceText:
          "your supervisor is not impressed that you don't have slides ready for your presentation. This was a requirement for the presentation, and you have neither met or exceeded expectations for today. In addition, you lose energy because of the minimal preparation you did do the night before.",
      },
      {
        id: "sick-skip-week",
        label:
          "Tell your supervisor that you are sick and you can't present this coming week. There's no way you can get a tape in on time.",
        energyDelta: 0,
        successDelta: -15,
        consequenceText:
          "this was a terrible idea. You've already missed two internship sessions this semester due to illness including a weeks-long sickness that involved a hacking cough and swollen, painful lymph nodes. Because of this, you are now hesitant to use her as a professional reference. You lose 15 success points.",
      },
    ],
  },
  "competence-worry-skills": {
    id: "competence-worry-skills",
    prompt:
      "You find yourself in your head a lot because you worry about how you are being perceived and whether you are competent in sessions with your patients. When beginning a new skill, you know that it is typical to feel like you don't know what you're doing, especially when you are still trying to get your bearings. What do you do?",
    choices: [
      {
        id: "meditate-more",
        label:
          "Meditate more so that you can be more present in sessions and calmer during the day.",
        energyDelta: 10,
        successDelta: 0,
        consequenceText:
          "meditation is a beautiful thing. It seems to keep you present in sessions and have a higher capacity take on more patients, but you're not sure if it helps you at all be more effective with patients. In addition, the amount of meditation that you do (1-2 hours per day) takes away from projects at work and time for schoolwork.",
      },
      {
        id: "tape-review-cointern",
        label:
          "Review 1-2 tapes every week with a co-intern to see if you can identify spaces of strength and improvement.",
        energyDelta: -5,
        successDelta: 10,
        consequenceText:
          "After reviewing tapes nearly every week during both practicum and internship I & II, you can confidently say that this method of skill improvement has given you more self-awareness, insight, and understanding of areas of work than any other activity that you've done. You gain 10 success points.",
      },
      {
        id: "role-play-weekly",
        label: "Do extra role-play practice every week",
        energyDelta: -5,
        successDelta: 10,
        consequenceText:
          "After doing multiple role-plays during the week during both practicum and internship I & II, you can confidently say that this method of skill improvement has given you as much self-awareness, insight, and mastery as tape review. You gain 10 success points.",
      },
      {
        id: "self-care-clinician",
        label:
          "Try and work on your self care so that you can feel more ready to deal with patients on a day to day basis. This might include more visits to the sauna, hot showers, runs, and other things that you know make you a more rejuvenated, well-rested, and present clinician.",
        energyDelta: 5,
        successDelta: 0,
        consequenceText:
          "Although all these things rejuvenate you, you don't necessarily feel more confident in your skills, or intervention work because of this. Furthermore, doing these things don't strengthen your areas of weakness or build on areas of competence. You gain 5 energy but your success level stays the same.",
      },
    ],
  },
};

/** Linear order for “next question” navigation */
export const QUESTION_ORDER: string[] = [
  "consultancy-project",
  "roommate-conflict",
  "intern-office-noise",
  "aspen-fellowship-application",
  "theory-case-tape-crisis",
  "competence-worry-skills",
];

export function getQuestion(id: string): Question | undefined {
  return questions[id];
}

export function getChoice(
  questionId: string,
  choiceId: string,
): Choice | undefined {
  const question = getQuestion(questionId);
  return question?.choices.find((choice) => choice.id === choiceId);
}

export function getNextQuestionId(currentId: string): string | null {
  const i = QUESTION_ORDER.indexOf(currentId);
  if (i === -1 || i >= QUESTION_ORDER.length - 1) return null;
  return QUESTION_ORDER[i + 1] ?? null;
}

export const FIRST_QUESTION_ID = QUESTION_ORDER[0] ?? "consultancy-project";
