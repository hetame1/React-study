# 리액트

- 리액트는 라이브러리이지만 프레임워크처럼 다른 라이브러리들을 사용하여 프레임워크처럼 사용한다

## 리액트 컴포넌트

- 컴포넌트란 리액트로 만들어진 앱을 이루는 최소한의 단위

- 하나의 페이지는 여러개의 컴포넌트가 모여서 이루어진다

- 리액트 컴포넌트는 클래스형 컴포넌트 방식과 함수형 컴포넌트 방식이 있다

- 이전에는 클래스형 컴포넌트를 이용해서 많이 개발을 했지만 리액트 Hooks가 도입되면서 함수형 컴포넌트를 이용해서 개발을 많이 한다

### SPA

- SPA는 Single Page Application의 약자로 한개의 페이지로 이루어진 애플리케이션이라는 뜻이다

- SPA는 서버로부터 완전한 새로운 페이지를 불러오지 않고 현재의 페이지를 동적으로 다시 작성해서 사용하는 애플리케이션이다

# TICTACTOE

## 컴포넌트

- 리액트에서 컴포넌트를 사용할 때는 import 를 한후에 <import 한 이름 /> 이런 형식으로 사용한다

## props

- props는 properties의 줄임말로 컴포넌트 속성을 설정할 때 사용하는 요소이다

- props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용한다
- 반대 방향으로는 데이터를 전달할 수 없다

- props는 자식 컴포넌트에서는 변경할 수 없다

- 사용방법은 <컴포넌트 속성이름="값" /> 이런 형식으로 사용하고 자식 컴포넌트에서는 this.props.컴포넌트 속성이름 이런 형식으로 사용한다

- 함수도 props로 전달할 수 있다

## click

- 리액트에서 click 이벤트를 사용할때는 click 을 사용할 요소 안에 onClick={함수} 이런 형식으로 사용한다

## state

- 컴포넌트에서 어떤 것을 기억해야 할 때 state를 사용한다

- Constuctor(생성자)에서 this.state = {state 이름: state 값} 이런 형식으로 사용한다

- setState({state 이름: state 값}) 이런 형식으로 변경

**_ 리액트에서는 데이터가 변할 때 화면을 다시 렌더링 해주기 위해서 React State를 사용해야 한다 _**

- state가 변경되면 컴포넌트는 리렌더링되고 state는 컴포넌트 안에서 관리됩니다

## super() 란?

- super() 를 써야지만 this를 사용할 수 있음

- super() 는 부모 클래스의 생성자를 호출하는 함수

- 생성자 내부에서도 this.props 를 정상적으로 사용할 수 있도록 보장하기 위해서 super에 props를 인자값으로 넣어준다

### State 와 Props

- 자식 컴포넌트에서 부모 컴포넌트에 있는 값이 필요할 때 props를 사용

- State는 해당 컴포넌트 내부에서 데이터 처리될때 사용

- State가 변하면 re-render 된다

## state 부모 요소로 전달

- 부모 요소에서 자식 요소로 state를 전달할 때는 <자식 요소 state 이름={this.state.state 이름} /> 이런 형식으로 전달한다

- Array.prototype.fill() 메서드는 배열의 시작 인덱스부터 끝 인덱스까지 정적인 값 하나로 채운다

- Array.prototype.slice() 메서드는 배열의 시작 인덱스부터 끝 인덱스까지 얕게 복사한 새로운 배열 객체를 반환한다

## 불변성

- 데이터 타입에는 원시타입과 참조타입이 있다

- 원시타입은 String, Number, Boolean, Null, Undefined, Symbol 이 있고 참조타입은 Object, Array, Function 이 있다

- 원시타입은 값이 변경되면 새로운 값을 할당하고 참조타입은 값이 변경되면 원래 있던 값이 변경된다

- 객체나 배열의 값이 변할 때 원본 데이터가 변경이 되기 때문에 다른 객체에서 오류가 발생해서 데이터를 불변성을 유지해야 한다

- 이 불변성을 유지하기 위해서 spread operator, map, filter, slice, reduce 등을 사용

- 원본 데이터를 변경할때는 splice, push, pop, shift, unshift 등을 사용

# React Hooks

- class 없이 state를 사용할 수 있는 새로운 기능

### 클래스 컴포넌트 vs 함수형 컴포넌트

- 클래스 컴포넌트: 더 많은 기능, 더 긴 코드, 더 복잡한 코드, 더딘 성능

- 함수형 컴포넌트: 더 적은 기능, 짧은 코드, 심플한 코드, 더 빠른 성능

- 더 적은 기능이란 state와 lifecycle 기능이 없다는 뜻이다

- 하지만, React Hooks가 도입되면서 함수형 컴포넌트에서도 state와 lifecycle 기능을 사용할 수 있게 되었음

### HOC (Higher-Order Component)

- HOC 컴포넌트를 Custom React Hooks 로 대채해서 많은 Wrapper 컴포넌트를 줄일 수 있다

- 화면에서 재사용 가능한 로직을 분리해 컴포넌트로 만들고 재사용 불가능한 UI 와 같은 다른 부분들은 parameter로 받아서 처리하는 방법

- 이렇게 해도 warpper 컴포넌트가 많아지면 코드가 복잡해지고 가독성이 떨어지는 단점이 있다

- 이런 단점을 해결하기 위해서 Custom React Hooks를 사용

### useState, useEffect

- 클래스 컴포넌트에서 state를 사용할때는 this.state = { name: "" } 이런식으로 사용하고 값을 바꿀때는 this.setState({ name: "값" }) 이런식으로 사용하는데
  React Hooks에서는 const [Name, setName] = useState("기본값") 이런식으로 사용하고 값을 바꿀때는 setName("값") 이런식으로 사용한다

- 클래스형 컴포넌트에서는 값을 처음 불러올때, 값이 변경될때, 값이 사라질때 componentDidMount, componentDidUpdate, componentWillUnmount 를 사용했는데
  React Hooks에서는 useEffect를 사용해서 마지막에 [바뀌는 값] 이런식으로 사용한다

## 전개 연산자

- 특정 객체 또는 배열의 값을 다른객체, 배열로 복제하거나 옮길 때 사용

- ...을 사용해서 전개 연산자를 사용

- 기존배열을 수정하지 않고 새로운 배열을 만들어서 사용할 수 있음

### map() 메서드

- map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환

## JSX Key 속성

- 리액트에서 요소의 리시트를 나열할 때는 key 속성을 사용해야 한다

- key 속성은 고유한 값을 사용해야 한다

- key 속성은 리액트가 어떤 항목을 변경, 추가, 삭제할지 식별하는 것을 돕는다
