const gameContainer = document.getElementById('game-container');
const textElement = document.getElementById('text');
const choicesElement = document.getElementById('choices');
const explanationElement = document.getElementById('explanation');
const nextButton = document.getElementById('next-button');

let currentScene = 0;
let userJob = '';

const scenes = [
    // 0: Job Selection
    {
        text: '你現在是一位剛畢業的求職者，你會選哪種工作？',
        choices: [
            { text: 'A. 餐飲店員（低技能）', value: '餐飲店員' },
            { text: 'B. 辦公室職員（中技能）', value: '辦公室職員' },
            { text: 'C. 工程師（高技能）', value: '工程師' }
        ],
        isQuestion: false
    },
    // 1: Event 1 - AI
    {
        text: '🤖 公司引進自動化設備，你被取代了。這屬於什麼失業？',
        choices: [
            { text: 'A. 摩擦性失業', correct: false },
            { text: 'B. 結構性失業', correct: true },
            { text: 'C. 循環性失業', correct: false }
        ],
        explanation: '✔ 結構性失業<br>原因：你的技能不符合市場需求，因為科技改變了工作的性質。',
        isQuestion: true
    },
    // 2: Event 2 - Recession
    {
        text: '📉 景氣不好，公司開始縮編裁員，你也收到了裁員通知。這屬於什麼失業？',
        choices: [
            { text: 'A. 摩擦性失業', correct: false },
            { text: 'B. 結構性失業', correct: false },
            { text: 'C. 循環性失業', correct: true }
        ],
        explanation: '✔ 循環性失業<br>原因：整體經濟衰退，導致工作機會全面減少。',
        isQuestion: true
    },
    // 3: Event 3 - Job Hopping
    {
        text: '🔄 你主動辭職，希望能找到一份薪水更高、前景更好的工作。這屬於什麼失業？',
        choices: [
            { text: 'A. 摩擦性失業', correct: true },
            { text: 'B. 結構性失業', correct: false },
            { text: 'C. 循環性失業', correct: false }
        ],
        explanation: '✔ 摩擦性失業<br>原因：這是轉換工作期間發生的短暫失業，是勞動市場正常的現象。',
        isQuestion: true
    },
    // 4: Event 4 - Minimum Wage
    {
        text: '💰 政府宣布調漲基本工資！哪一種人「最可能」因此受到影響而失業？',
        choices: [
            { text: 'A. 工程師', correct: false },
            { text: 'B. 餐飲店員', correct: true },
            { text: 'C. 老闆', correct: false }
        ],
        explanation: '✔ 餐飲店員<br>原因：基本工資提高增加了公司的人力成本，使其可能減少「低技能工作」的職位來控制開銷。這有時也可能形成「結構性失業」。',
        isQuestion: true
    },
    // 5: Summary
    {
        text: '🎯 總結：今天你學到了失業的三種類型！',
        choices: [],
        explanation: '🟣 結構性失業 → 技能不符<br>🔵 循環性失業 → 景氣不好<br>🟢 摩擦性失業 → 轉職過程<br><br>希望這個小遊戲能幫助你了解經濟學的基本概念！',
        isQuestion: false
    }
];

function showScene(sceneIndex) {
    const scene = scenes[sceneIndex];
    textElement.innerHTML = scene.text;
    choicesElement.innerHTML = '';
    explanationElement.style.display = 'none';
    explanationElement.innerHTML = '';
    nextButton.style.display = 'none';

    if (scene.choices.length > 0) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerHTML = choice.text;
            button.classList.add('choice-button');
            button.onclick = () => handleChoice(sceneIndex, choice);
            choicesElement.appendChild(button);
        });
    } else {
        // For summary scene
        explanationElement.innerHTML = scene.explanation;
        explanationElement.style.display = 'block';
    }
}

function handleChoice(sceneIndex, choice) {
    const scene = scenes[sceneIndex];

    if (scene.isQuestion) {
        const buttons = choicesElement.getElementsByTagName('button');
        Array.from(buttons).forEach(button => {
            button.disabled = true;
            // Find the corresponding choice object to check its `correct` property
            const choiceData = scene.choices.find(c => c.text === button.innerHTML);
            if (choiceData && choiceData.correct) {
                button.classList.add('correct');
            }
        });

        if (!choice.correct) {
            const selectedButton = Array.from(buttons).find(b => b.innerHTML === choice.text);
            if (selectedButton) {
                selectedButton.classList.add('wrong');
            }
        }

        explanationElement.innerHTML = scene.explanation;
        explanationElement.style.display = 'block';
        nextButton.style.display = 'block';
    } else {
        // Handle job selection in scene 0
        userJob = choice.value;
        currentScene++;
        showScene(currentScene);
    }
}

nextButton.addEventListener('click', () => {
    currentScene++;
    if (currentScene < scenes.length) {
        showScene(currentScene);
    } else {
        // End of game, restart option
        textElement.innerHTML = '遊戲結束！感謝遊玩。';
        choicesElement.innerHTML = '';
        explanationElement.style.display = 'none';
        nextButton.innerHTML = '重新開始';
        nextButton.style.display = 'block';
        nextButton.onclick = () => {
            currentScene = 0;
            userJob = '';
            nextButton.innerHTML = '繼續';
            showScene(currentScene);
        };
    }
});

// Start the game
showScene(currentScene);