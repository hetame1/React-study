import Button from './components/shared/Button'
import Text from './components/shared/Text'

function App() {
  return (
    <div>
      <Text typography="t1" color="black" bold>
        테스트
      </Text>

      <div style={{ height: 10, width: '100%', backgroundColor: 'red' }}></div>
      <Button color="primary" size="large">
        버튼
      </Button>
    </div>
  )
}

export default App
