const QUESTIONS = [
    {
        label: 'Что необходимо понять перед тем, как начинать инвестиции?',
        answers: [
            'Сформулировать чёткий финансовый план',
            'Следовать советам без анализа',
            'Делать вложения только потому, что так поступают другие',
            'Инвестировать вслепую без оценки рисков',
        ],
    },
    {
        label: 'Какие вложения чаще всего считаются более надёжными в долгосрочной перспективе?',
        answers: [
            'Разнообразный портфель с минимальным риском',
            'Сильно колеблющиеся акции',
            'Нерегулируемые инструменты',
            'Проекты без опыта и истории',
        ],
    },
    {
        label: 'Какой принцип помогает уменьшить риски при формировании капитала?',
        answers: [
            'Распределение средств по разным направлениям',
            'Вложение всех средств в один актив',
            'Опираться на единственный источник информации',
            'Полное игнорирование рыночных новостей',
        ],
    },
    {
        label: 'Что может напрямую влиять на уровень доходности вложений?',
        answers: [
            'Общая ситуация на рынке и в экономике',
            'Оформление интернет-страницы',
            'Название продукта',
            'Возраст инвестора',
        ],
    },
    {
        label: 'Какое понятие отражает высокий финансовый результат?',
        answers: [
            'Высокая доходность',
            'Минимальные поступления',
            'Частичный выход',
            'Первоначальный взнос',
        ],
    },
];





const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
<div class="container quiz-wrapper">
    <div class="quiz-content">
        <div class="content">
            <img class="quiz-image" src="assets/custom/images/bg1.png"/>
            <h2 class="title">Интерактивное обучение инвестициям</h2>
            <h5 class="text">Пошаговое обучение инвестированию — от первых знаний до уверенной работы на рынке. Программа раскрывает ключевые основы и формирует практические умения, необходимые для успешного развития в сфере инвестиций.</h5>
            <div class="contact-wrapper">
                <div class="my-3 icons-wrapper">
                    <span
                        class="fables-iconemail fables-second-text-color pr-2 font-20 mt-1 d-inline-block"
                    ></span>
                    <p
                        class="font-14 fables-fifth-text-color mt-2 ml-4"
                    >
                        profit_quiz@gmail.com
                    </p>
                </div>
            </div>
            <button class="btn btn-primary w-100 py-3 first-button" data-action="startQuiz">Начать обучение</button>
        </div>
    </div>
</div>



      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

                // <div class="bar-wrapper" style="width: 100%; padding-left: 20px; padding-right: 20px">
                //     <div class="progress" style="padding-left: 0 !important; padding-right: 0 !important;">
                //         <div class="progress-bar" style="width: ${questionsStep.getProgress()}%"></div>
                //     </div>
                // </div>

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
          <div class="container quiz-wrapper">
            <div class="quiz-content text-center quiz-start">
                <div class="question-wrapper">
                    <h3 class="question mt-4">${question.label}</h3>
                </div>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `,
                        )
                        .join('')}
                </div>


            </div>
        </div>
      `;
    },
    getProgress: () =>
        Math.floor((questionsStep.questionIndex / QUESTIONS.length) * 100),
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'goToNextQuestion':
                return questionsStep.goToNextQuestion();
            case 'goToPreviousQuestion':
                return questionsStep.goToPreviousQuestion();
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

//   <h2 class="title">Formulario de contacto financiero</h2>
//   <h3 class="mb-4">Por favor, completa el formulario para recibir tus resultados financieros</h3>

const finalStep = {
    render: () => {
        $container.innerHTML = `
     <div class="container quiz-wrapper">
    <div class="row quiz-content form-content">
        <div class="col-lg-6 col-md-6 col-sm-12 form-block">
            <form id="quiz-form">
                <h2 class="title" style="color: #fff;">Почти готово! Сохрани свои результаты</h2>
                <p class="text" style="color: #fff; margin-bottom: 20px;">Заполни форму, чтобы оценить свои знания в области инвестиций, финансового планирования и управления капиталом.</p>
                
                <input class="form-control" name="name" type="text" placeholder="Имя и фамилия" required>
                <input class="form-control" name="email" type="email" placeholder="Электронная почта" required>
                <input class="form-control" name="phone" type="tel" placeholder="Номер телефона" required>

                <div class="checkbox" style="color: #fff;">
                    <input type="checkbox" required id="privacyPolicy">
                    <label for="privacyPolicy">
                        Я принимаю
                        <a class="form-link" href="cookie-policy.html" target="_blank" style="color: #fff; text-decoration: underline;">Политику использования файлов cookie</a>,
                        <a class="form-link" href="privacy-policy.html" target="_blank" style="color: #fff; text-decoration: underline;">Политику конфиденциальности</a> и
                        <a class="form-link" href="terms-of-use.html" target="_blank" style="color: #fff; text-decoration: underline;">Условия использования</a> и согласен на обработку моих персональных данных.
                    </label>
                </div>

                <div class="checkbox" style="color: #fff;">
                    <input type="checkbox" id="newsletter" checked>
                    <label for="newsletter">Я хочу получать эксклюзивные предложения по электронной почте.</label>
                </div>

                ${Object.keys(quiz.answers)
                    .map(
                        question =>
                            `<input name="${question}" value="${quiz.answers[question]}" hidden>`
                    )
                    .join('')}

                <button type="submit" class="btn btn-primary w-100 py-3 first-button">Отправить</button>
            </form>
        </div>
    </div>
</div>

      `;

        // Agrega aquí el manejador de envío del formulario
        document.getElementById('quiz-form').addEventListener('submit', function (e) {
            e.preventDefault(); // evita el envío tradicional del formulario
            localStorage.setItem('quizDone', true);
            window.location.href = 'thanks.html';
        });
    },

    // Ya no necesitas esto si no se usa en ningún sitio:
    onClick: (el) => {
        const newPath = 'thanks.html';
        if (el.getAttribute('data-action') === 'submitAnswers') {
            localStorage.setItem('quizDone', true);
            document.getElementById('main-page').classList.remove('hide');
            document.getElementById('quiz-page').classList.add('hide');
            document.getElementById('footer').classList.add('hide');
            window.location.href = newPath;
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    document.getElementById('main-page').classList.add('hide');
    quiz.init();
    quiz.render();
}
