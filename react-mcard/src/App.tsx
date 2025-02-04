import Alert from './components/shared/Alert'
import Button from './components/shared/Button'
import Input from './components/shared/Input'
import Text from './components/shared/Text'
import TextField from './components/shared/TextField'
import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()

  return (
    <div>
      <Text typography="t1" color="black" bold>
        테스트
      </Text>

      <div style={{ height: 10, width: '100%', backgroundColor: 'red' }}></div>
      <Button color="primary" size="large">
        버튼
      </Button>

      <Input placeholder="입력하세요" aria-invalid="false" />

      <TextField label="입력하세요" aria-invalid="false" />

      {/* <Alert
        title="알림"
        description="알림 안내를 보여줍니다."
        buttonLabel="확인"
        onButtonClick={() => console.log('clicked')}
        open={true}
      /> */}

      <Button
        color="primary"
        size="large"
        onClick={() =>
          open({
            title: '알림',
            description: '알림 안내를 보여줍니다.',
            buttonLabel: '확인',
            onButtonClick: () => console.log('clicked'),
          })
        }
      >
        버튼
      </Button>
    </div>
  )
}

export default App
