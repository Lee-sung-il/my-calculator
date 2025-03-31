// 계산기 화면에 표시될 요소 선택
const screen = document.querySelector('.screen');

// 모든 버튼 요소를 선택 (숫자, 연산자, 기능 버튼 등)
const buttons = document.querySelectorAll('.btn');

// 계산 상태를 저장할 변수들
let currentInput = '0'; // 현재 입력 중인 값
let operator = null; // 현재 선택된 연산자
let previousInput = ''; // 이전 입력 값 (연산 대상 1)

// 화면에 현재 입력 값을 출력하는 함수
function updateScreen() {
  screen.textContent = currentInput;
}

// 버튼 클릭 이벤트 등록
buttons.forEach((button) => {
  // clear 버튼은 따로 처리하므로 제외
  if (button.id === 'clear') {
    return;
  }

  button.addEventListener('click', () => {
    const value = button.textContent;
    console.log(value); // 어떤 버튼이 눌렸는지 로그 출력

    // 숫자나 소수점(.)일 경우
    if (!isNaN(value) || value === '.') {
      handleNumber(value); // 숫자 처리 함수 호출
    } else {
      handleOperator(value); // 연산자 또는 기능 키 처리
    }

    updateScreen(); // 클릭 후 화면 갱신
  });
});

// 숫자 및 소수점 입력 처리
function handleNumber(num) {
  // 입력값이 '0'일 때, 다른 숫자가 들어오면 덮어씀
  if (currentInput === '0' && num !== '.') {
    currentInput = num;
  } else {
    // 소수점이 이미 있을 경우 중복 방지
    if (!(num === '.' && currentInput.includes('.'))) {
      currentInput += num;
    }
  }
}

// 연산자 및 특수 기능 처리
function handleOperator(op) {
  switch (op) {
    case 'DEL':
      // 마지막 문자 제거, 모두 지워지면 '0'으로 유지
      currentInput = currentInput.slice(0, -1) || '0';
      break;
    case '±':
      // 부호 변경
      currentInput = (parseFloat(currentInput) * -1).toString();
      break;
    case '%':
      // 백분율 처리 (100으로 나눔)
      currentInput = (parseFloat(currentInput) / 100).toString();
      break;
    case '÷':
    case '×':
    case '−':
    case '+':
      console.log('firstOperand : ', currentInput);
      console.log('operator :', op);

      // 이전 값과 현재 값이 모두 있고 연산자가 있을 경우 계산
      if (operator && previousInput !== '' && currentInput !== '') {
        calculate();
      }

      // 이전 입력값 저장 후 현재 입력값 초기화
      previousInput = currentInput;
      operator = op;
      currentInput = '';
      break;

    case '=':
      // 계산 가능한 상태일 때만 실행
      if (operator && previousInput !== '' && currentInput !== '') {
        calculate(); // 계산 실행
        operator = null; // 연산자 초기화
      }
      break;
  }
}

// AC(clear) 버튼 처리
const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
  currentInput = '0';
  operator = null;
  previousInput = '';
  updateScreen(); // 초기화된 값 화면에 표시
});

// 실제 계산 수행 함수
function calculate() {
  const prev = parseFloat(previousInput); // 이전 입력 숫자
  const curr = parseFloat(currentInput); // 현재 입력 숫자

  // 숫자가 아니면 계산하지 않음
  if (isNaN(prev) || isNaN(curr)) return;

  // 연산자에 따라 계산 수행
  switch (operator) {
    case '+':
      currentInput = (prev + curr).toString();
      break;
    case '−':
      currentInput = (prev - curr).toString();
      break;
    case '×':
      currentInput = (prev * curr).toString();
      break;
    case '÷':
      currentInput =
        curr !== 0
          ? parseFloat(prev / curr)
              .toFixed(2)
              .toString()
          : 'Error'; // 0으로 나누기 방지
      break;
  }

  previousInput = ''; // 계산 후 이전 값 초기화
}

// 페이지 로딩 시 초기 화면 출력
updateScreen();
