export async function fetchCategory() {
    try {
        const categoryList = await fetch('https://opentdb.com/api_category.php');
        const jsonCategoryList = await categoryList.json();
        const categoryArray = jsonCategoryList.trivia_categories;
        categoryArray.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id;
            option.textContent = element.name;
            document.getElementById('category').append(option);
        });
    } catch (error) {
        console.log(error);
    }
}

export async function generateQuestions(number, category, difficulty, type) {
    try {
        const questionlist = await fetch(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`);
        const jsonQuestionList = await questionlist.json();
        if (jsonQuestionList.results.length === 0) {
            generateQuestions(number - 1, category, difficulty, type);
        } else {
            showQuestions(jsonQuestionList.results);
        }
    } catch (error) {
        console.log(error);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function createQuestionsSelects(array) {
    let index = 0;
    const correctAnswers = [];
    array.forEach(element => {
        const questionDiv = document.createElement('div');
        questionDiv.setAttribute('class', 'current-questions');
        const question = document.createElement('p');
        question.innerHTML = element.question;
        questionDiv.append(question);
        const select = document.createElement('select');
        select.id = index;
        select.setAttribute('required', "required");
        select.setAttribute('class', 'current-answers');
        correctAnswers.push(element.correct_answer);
        const answers = element.incorrect_answers;
        answers.push(element.correct_answer);
        const randomizedAnswers = shuffleArray(answers);
        randomizedAnswers.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.innerHTML = item;
            select.append(option);
        });
        questionDiv.append(select);
        document.getElementById('questions-form').prepend(questionDiv);
        index++;
    });
    return correctAnswers;
}

function checkCorrectWrong(array) {
    let correct = 0;
    let wrong = 0;
    document.querySelectorAll('.current-answers').forEach(element => {
        if (element.value === array[element.id]) {
            correct++;
        } else {
            wrong++;
        }
    });
    alert(`Correct Answers = ${correct}\nWrong Answers = ${wrong}`);
}

function showQuestions(array) {
    document.querySelectorAll('.current-questions').forEach(element => {
        element.remove();
    });
    document.getElementById('questions').style.display = 'block';
    const correctAnswers = createQuestionsSelects(array);
    document.getElementById('questions-form').onsubmit = function (event) {
        event.preventDefault();
        checkCorrectWrong(correctAnswers);
    };
}