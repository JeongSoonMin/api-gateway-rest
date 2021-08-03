샘플 API-Gateway(rest) 구축
======================================
## 기본 필요사항
   * AWS IAM 권한 확인
   * AWS Credential 셋팅
   * node, npm 설치
   * serverless 설치

## 개발 필요사항
   * 공통 모듈에서 사용 할 package.json 모듈 설치
   * serverless.yml 에 사용할 기능 정의 및 배포
   * 로컬 테스트 방법

### 기본 필요사항 - AWS IAM 권한 확인
* serverless 배포시에 개발자 계정에 iam 권한이 필요하다.
* serverless 배포시 aws cloudformation 에 stack이 추가되면서 자동적으로 연관된 리소스가 배포 된다.
  이때 필요한 권한으로 cloudformation:createApplication 권한 필요
* cloudformation 에서 api-gateway 연결, lambda 생성, 호출 권한(Role) 생성 등이 이루어지기 때문에 아래 추가 권한 필요
    * lambdaFullAccess
    * 그 밖의 권한은 확인 필요

### 기본 필요사항 - AWS Credentials 셋팅
* credentials 셋팅
    * $ vi ~/.aws/credentials
      <pre><code>
      [default]
      aws_access_key_id=XXXXXXXXX
      aws_secret_access_key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      </code></pre>
    * $ vi ~/.aws/config
      <pre><code>
      [default]
      region=ap-northeast-2
      output=json
      </code></pre>

### 기본 필요사항 - node, npm 설치
* node, npm 설치
    1. homebrew 가 설치 되어 있어야 한다. 미설치시 명령어 실행. 설치 되어 있을 경우 pass
       <pre><code>
       $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
       </code></pre>
    2. node, npm 설치
       <pre><code>
       $ brew install node
       </code></pre>
    3. 설치 완료시 아래 명령어로 버전 확인
       <pre><code>
       $ node -v
       $ npm -v
       </code></pre>
    4. yarn을 사용 하고 싶을 경우 아래 명령어로 설치(optional)
       <pre><code>
       $ brew install yarn --ignore-dependencies
       $ yarn -v
       </code></pre>

### 기본 필요사항 - serverless framework 모듈 설치
* serverless framework 모듈 및 plugin 설치
* 설치시 serverless 제외한 plugin은 원래 package.json 에 추가 설치 하는데,
  lambda 기본 패키지 구조 설정 및 layer 업로드시 plugin library가 추가되기 때문에 global로 설치하여 제외 시킴
   <pre><code>
   $ npm install -g serverless
   $ npm i -g serverless-import-apigateway
   $ npm i -g serverless-plugin-log-subscription
   $ npm i -g serverless-offline
   </code></pre>

### 작업시 필요사항 - 신규 gateway 생성
* sample-api-gw.yml 파일을 복사하여 {서비스명}-api-gw.yml 을 생성한다.
* 복사한 신규 yml 파일 내용 중 상단에 service: sample-api-gateway 를 수정한다.
* 특정 게이트웨이에서 별도 설정이 필요 할 경우 yml 내용에서 필요한 내용 추가, 수정 한다.

### 작업 필요사항 - 신규 gateway 배포
* serverless 배포 방법
* -s 옵션 : 개발 배포 할 stage 환경. 기본값 dev.
* -c 옵션 : config 파일 지정. 다른 파일 선택시 다른 api-gateway 가 배포 될 수 있으니 config 명 필수 확인 후 배포 필요
<pre><code>
프로젝트 최상위 경로에서 명령어 실행
$ serveless deploy -c sample-api-gw.yml
단축어로 sls deploy 도 사용 가능
stage가 기본값 dev로 되어 있어 stage 환경 배포시에는
$ sls deploy -s stage -c sample-api-gw.yml
로 실행 가능
</code></pre>
