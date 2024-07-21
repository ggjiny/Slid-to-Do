# Slid to Do

## 커밋 컨벤션
| 커밋 유형 | 의미 |
| --- | --- |
| feat | 새로운 기능 추가 |
| style | 스타일 코드 변경 |
| type | 타입 수정 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| refactor | 코드 리팩토링 |
| test | 테스트 코드, 리팩토링 테스트 코드 추가 |
| chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
| rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
| remove | 파일 삭제하는 경우 |
| hotfix | 급하게 치명적인 버그를 고쳐야 하는 경우 |

## 코드 컨벤션
### 01 폴더명

📁 폴더명의 경우 **소문자** 작성

### 02 파일명 / 컴포넌트명(함수형)

📄 컴포넌트 파일명은 **PascalCase로 통일**

📄 그 외 파일명은 **소문자** 작성

ex) Home.tsx

ex) index.d.ts

### 03 함수명(메소드명) / 변수명

➰ 함수명, 변수명은 **camelCase**로 작성

- 이름을 통해 어떤 기능을 제공하는지 알 수 있도록 작성
- 딕셔너리, 배열 등의 복수의 데이터를 담는 자료구조에 대한 변수명 s 붙이기 `ex) heights`
- 로딩이나 모달창 등의 보여짐 여부에 대한 boolean state의 경우 is 붙이기 `ex) isModalOpen, isLoading`
- 데이터 접근 함수의 경우 get으로 시작하기 `ex) getUserData`

| 함수명 | 동사구 ex) getUserData |
| --- | --- |
| 변수명 | 명사구 ex) userData |

### 04 주석

1️⃣ **인라인 주석**

- 무분별하게 line by line 주석은 지양
- if문, for문, switch문 그런 구문 선언 부분 위에 간단하게 어떤 기능을 하는지 설명
- 설명에 대한 주석은 한글로 작성

2️⃣ **함수 주석**

```jsx
/**
* 함수 설명
* @param a: 덧셈을 위한 첫번째 인자
* @param b: 덧셈을 위한 두번째 인자
* @return: 인자로 받은 두 정수를 더한 값을 리턴
*/
const filterDescription = (a, b) => {return {a, b}};

```


## 브랜치 전략

### Github Flow

Github Flow는 단순하고 효과적인 브랜치 전략으로, 항상 배포 가능한 상태를 유지하는 것을 목표로 합니다. 이 전략은 최신 기능이 항상 배포되어도 되는 환경과 CI/CD가 잘 갖춰져 있어 버그에 대한 대비가 잘 되어있는 경우에 적합합니다.

- **main 브랜치**: 항상 배포 가능한 상태를 유지합니다. 이 브랜치에 머지된 코드는 곧바로 프로덕션 환경에 배포될 수 있습니다.
- **feature 브랜치**: 새로운 기능을 개발할 때 사용합니다. 기능 개발이 완료되면 main 브랜치로 병합됩니다.

### 브랜치 규칙

- **main에 머지된 브랜치는 삭제합니다**

- **브랜치 이름은 명확하게 작성합니다**

  - 브랜치 이름은 브랜치의 목적을 명확하게 나타내야 합니다.
  - 명명 규칙:
    1. `feature/<기능명>`: 새로운 기능을 추가할 때 사용합니다. 예: `feature/login`
    2. `bugfix/<버그번호>`: 버그 수정을 위한 브랜치 이름입니다. 예: `bugfix/123`
    3. `hotfix/<버그번호>`: 긴급한 버그 수정을 위한 브랜치 이름입니다. 예: `hotfix/critical-fix`
    4. `refactor/<리팩토링내용>`: 코드 리팩토링을 위한 브랜치 이름입니다. 예: `refactor/cleanup-code`
    5. `release/<버전번호>`: 배포 준비를 위한 브랜치 이름입니다. 예: `release/1.0.0`
    6. `experiment/<실험명>`: 새로운 아이디어나 기술 실험을 위한 브랜치 이름입니다. 예: `experiment/new-idea`
    7. `docs/<문서명>`: 문서 작업을 위한 브랜치 이름입니다. 예: `docs/update-readme`

- **하나의 브랜치에서는 하나의 작업만 합니다**

## PR 컨벤션

팀원들이 일관된 방식으로 풀 리퀘스트(PR)를 작성하고 검토할 수 있도록, 다음의 PR 컨벤션을 따릅니다.

### PR 작성 가이드라인

PR을 작성할 때는 아래 템플릿을 사용하여 필요한 정보를 제공합니다.

#### 작업 개요

작업의 목적과 주요 변경 사항을 간략하게 설명합니다.

#### 관련 이슈

이 PR과 관련된 이슈 번호를 명시합니다. 예: closed: #4

#### 변경 사항 (PR 내용)

해당 PR에서 구현된 기능, 수정된 버그, 또는 기타 변경 사항을 상세히 설명합니다.

#### 참고 사항

리뷰어가 리뷰할 때 유의해야 할 사항이나 생각해볼 문제를 기재합니다.

#### 테스트 결과

테스트 결과를 설명하고, 스크린샷, GIF, 또는 라이브 데모 링크를 첨부합니다. 스크린샷을 권장합니다.

#### 체크리스트

PR을 제출하기 전에 아래 항목들을 확인해 주세요:

- [ ] merge할 브랜치를 확인했습니다.
- [ ] Reviewers를 지정했습니다.
- [ ] Assignees로 본인을 선택했습니다.
- [ ] 적절한 label을 선택했습니다.
- [ ] PR은 본인이 merge합니다 (Squash and merge).

---

### PR 프로세스

1. **PR 생성**: 작업을 완료한 후, 변경 사항을 설명하는 PR을 생성합니다.
2. **코드 리뷰 요청**: PR이 생성되면 팀원들에게 코드 리뷰를 요청합니다.
3. **코드 리뷰 진행**: 리뷰어는 코드를 검토하고 피드백을 제공합니다.
4. **피드백 대응**: PR 작성자는 리뷰어의 피드백을 반영하여 코드를 수정합니다.
5. **리뷰어 동의**: 리뷰어는 수정된 코드를 다시 검토하고 동의합니다.
6. **PR 병합**: 필요한 승인 수가 충족되면, PR을 메인 브랜치에 병합합니다.

### 코드 리뷰 피드백 구성

리뷰 피드백을 작성할 때는 필요한 부분에 말머리를 적어 구체적인 피드백을 제공합니다.

- **[Change Required]**: 반드시 수정이 필요한 부분
- **[Important Question]**: 코드의 의도나 구현 방식에 대한 중요한 질문
- **[Suggestion]**: 코드 개선을 위한 제안 사항

### 승인 기준

- **Required number of approvals before merging: 2**
  - PR이 메인 브랜치에 병합되기 위해서는 최소 2명의 승인이 필요합니다.

### 코드 리뷰 팁

- **리뷰를 위한 리뷰를 하지 마세요**: 피드백할 것이 없으면 칭찬을 해주세요. 긍정적인 피드백도 중요한 리뷰의 일부입니다.
- **구체적이고 명확한 피드백 제공**: 피드백은 구체적이고 명확하게 작성합니다. 예를 들어, "이 부분을 변경하세요"보다는 "이 부분을 변경하면 성능이 개선될 것입니다"와 같이 구체적인 이유를 설명합니다.
- **코드 스타일 가이드 준수**: 코드 스타일 가이드에 따른 일관된 코드 작성 여부를 확인합니다.
- **테스트 추가 여부 확인**: 새로운 기능이나 수정 사항에 대한 테스트가 추가되었는지 확인합니다.
- **의미 있는 커밋 메시지**: 커밋 메시지가 의미 있고 명확하게 작성되었는지 확인합니다.
- **문서화**: 필요한 경우 문서가 업데이트되었는지 확인합니다.

### 피드백 예시

```markdown
[Change Required] Please rename this function to make its purpose clearer. For example, use `calculateTotal` instead of `computeOrderTotal`.

[Important Question] Could you explain why you chose this approach? Were other approaches considered?

[Suggestion] I suggest simplifying this logic. You could refactor it as follows.
```
