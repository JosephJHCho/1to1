// 요청하신 단어 리스트 - 정답(answer) 부분을 Base64로 인코딩된 값으로 변경
const wordList = [
    { meaning: "참가하다", answer: "cGFydGljaXBhdGU=" }, 
    { meaning: "동시에", answer: "c2ltdWx0YW5lb3VzbHk=" }, 
    { meaning: "자발적으로", answer: "c3BvbnRhbmVvdXNseQ==" }, 
    { meaning: "고의로", answer: "b24gcHVycG9zZQ==" } 
];

let currentWordIndex = 0;

// Base64 디코딩을 위한 함수 (브라우저 환경에서 기본 제공)
function base64Decode(encodedString) {
    // atob() 함수는 Base64 인코딩된 문자열을 디코딩합니다.
    return atob(encodedString);
}

// 페이지 로드 시 첫 단어 설정
document.addEventListener('DOMContentLoaded', () => {
    loadWord();
});

function loadWord() {
    // 퀴즈 종료 시 처리 (이전과 동일)
    if (currentWordIndex >= wordList.length) {
        document.getElementById('korean-meaning').textContent = "퀴즈 완료! 🎉";
        document.getElementById('english-input').style.display = 'none';
        document.querySelector('button[onclick="checkAnswer()"]').style.display = 'none';
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('feedback-message').textContent = "";
        return;
    }

    const currentWord = wordList[currentWordIndex];
    document.getElementById('korean-meaning').textContent = currentWord.meaning;
    document.getElementById('english-input').value = ''; 
    document.getElementById('feedback-message').textContent = ''; 
    document.getElementById('next-button').style.display = 'none'; 
    document.getElementById('english-input').disabled = false;
}

function checkAnswer() {
    const userInput = document.getElementById('english-input').value.trim().toLowerCase();
    
    // 1. 저장된 Base64 인코딩된 정답을 가져옵니다.
    const encodedAnswer = wordList[currentWordIndex].answer;
    
    // 2. Base64 인코딩된 정답을 평문으로 복호화합니다.
    const decodedAnswer = base64Decode(encodedAnswer).trim().toLowerCase();
    
    const feedbackElement = document.getElementById('feedback-message');
    
    // 3. 사용자의 입력과 복호화된 정답을 비교합니다.
    if (userInput === decodedAnswer) {
        feedbackElement.textContent = "✅ 정답입니다! 다음 버튼을 누르세요.";
        feedbackElement.className = 'feedback correct';
        document.getElementById('english-input').disabled = true; 
        document.getElementById('next-button').style.display = 'inline-block';
    } else {
        feedbackElement.textContent = "❌ 틀렸습니다. 다시 시도해 보세요.";
        feedbackElement.className = 'feedback incorrect';
    }
}

function nextWord() {
    currentWordIndex++;
    loadWord();
}