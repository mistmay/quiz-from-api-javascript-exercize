import {
    fetchCategory,
    generateQuestions
} from './functions.js';

window.addEventListener('DOMContentLoaded', () => fetchCategory());

document.getElementById('generate-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const number = document.getElementById('number').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;
    generateQuestions(number, category, difficulty, type);
});