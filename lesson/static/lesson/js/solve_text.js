
function getShortEncouragement() {
    const encouragementList = [
        'You got this!',
        'Keep it up!',
        'Great job!',
    ];
    return `<div style="text-align: right;">${chooseFromList(encouragementList)}</div>`;
}

const pmTextlistIntro = `
                          Get ready for an Up-Down Round.
                          The counter above must move all the way to the right for you to continue.
                          If you answer correctly it moves forward 1 space.
                          If you answer a question incorrectly 3 times, it moves backward 2 spaces.
                          When you are ready to begin, press enter.
                        `;

function makeCdTextlistIntro(time, questionCount) {
    const cdTextlistIntro = `
                              Get ready for a timer challenge.
                              You will have ${time} minutes to answer ${questionCount} questions.
                              Don't panic or rush. You can always try again.
                              When you are ready to begin, press enter.
                            `;
    return cdTextlistIntro;
}


const cdTextlistRetry = `
                          Let's try again.
                          If it helps, consider this a practice round. Try to finish half or one quarter of the questions in the time limit.
                          When you are ready to begin, press enter.
                        `;

const ddIntroText = `
                        Now let's take a deep dive.
                        These questions may take you more time.
                        Make sure to use paper and a pencil or pen, if necessary.
                        Take your time. When you are ready to begin, press enter.
                    `;

const fqIntroText = `
                        Now for the final question.
                        This question will require thoughtfulness and creativity.
                        If you are in a classroom, your teacher will be able to review this answer.
                        When you are ready to begin, press enter.
                    `;

const fqGenericText = `
                        What is a question you still have from this lesson?
                    `;

const comingSoonText = `
                        This lesson and many others will be added soon.
                        <strong>Hit enter to express your interest.</strong>
                        Also, if you've liked the other lessons, have comments, or want to request a particular lesson be added, email us at openmath.us@gmail.com.
                        Cheers!
                    `;

const comingSoonSubmitText = `
                        Thanks for expressing your interest!
                        Again, if you've liked the other lessons, have comments, or want to request a particular lesson be added, email us at openmath.us@gmail.com.
                    `;

function makeCompletionHTML() {
    const lessonFullname = lessonDict[currentLesson]['full_name'];
    const completionHTML = `
                            <div>
                                Congratulations! You have finished ${lessonFullname}!
                            </div>
                            <div>
                                Click the button below to exit and (perhaps) start a new lesson.
                            </div>
                        `
    return completionHTML;
}
