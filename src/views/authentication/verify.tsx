import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import fetch from '../libs/fetch'
import useInterval from '../hooks/interval'
import { hasErrors } from '../libs/helper'
import { inject, observer } from 'mobx-react'
import {
  Popconfirm,
  message,
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Steps
} from 'antd'

const TIMER = 20

function VerifyView({ form, store }) {
  const router = useRouter()
  const [timer, setTimer] = useState(0)
  const [waitReSend, setWaitReSend] = useState(false)
  const [waitSubmit, setWaitSubmit] = useState(false)

  const { phoneNumber, email, authyId } = router.query || {
    phoneNumber: '',
    email: '',
    authyId: ''
  }

  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = form

  const codeError = isFieldTouched('code') && getFieldError('code')

  useEffect(() => {
    if (!authyId || authyId === '') {
      router.push('/login')
    }
    form.validateFields()
  }, [])

  useInterval(
    () => {
      setTimer(timer - 1)
    },
    timer === 0 ? null : 1000
  )

  const sendCode = async () => {
    try {
      setWaitReSend(true)
      const { data } = await fetch.post('users/login/', {
        phoneNumber,
        email
      })
      setTimer(TIMER)
      message.success(data.message)
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message)
      } else {
        message.error(error.message)
      }
    } finally {
      setWaitReSend(false)
    }
  }

  const submit = e => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (err) return

      try {
        setWaitSubmit(true)
        const { data } = await fetch.post('users/login/two-factor/', {
          authyId,
          token: values.code
        })
        store.onLogin(data.token)
        await router.push('/')
      } catch (error) {
        if (error.response) {
          message.error(error.response.data.message)
        } else {
          message.error(error.message)
        }
      } finally {
        setWaitSubmit(false)
      }
    })
  }

  return (
    <div className="login-layout">
      <div className="login-form">
        {/* steps */}
        <Row style={{ marginBottom: 60 }}>
          <Col span={20} offset={2}>
            <Steps current={1}>
              <Steps.Step title="Login" />
              <Steps.Step title="Verify" />
            </Steps>
          </Col>
        </Row>

        {/* form */}
        <Row>
          <Col span={24}>
            <Form onSubmit={submit}>
              <Form.Item
                validateStatus={codeError ? 'error' : ''}
                help={codeError || ''}
              >
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your sms code!'
                    },
                    {
                      len: 6,
                      message: 'SMS Code 6 karakterli olmalıdır!'
                    }
                  ]
                })(
                  <Input
                    autoComplete="off"
                    allowClear
                    maxLength={6}
                    prefix={
                      <Icon
                        type="number"
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                  loading={waitSubmit}
                  block
                >
                  Verify
                </Button>
              </Form.Item>

              <Form.Item
                type="flex"
                justify="center"
                style={{ marginBottom: 0 }}
              >
                <Popconfirm
                  title={`${phoneNumber} numaraya gönderilecek.`}
                  onConfirm={sendCode}
                  okText="Yes"
                  cancelText="No"
                  disabled={timer > 0}
                >
                  <Button
                    type="link"
                    icon="sync"
                    loading={waitReSend}
                    disabled={timer > 0}
                  >
                    Kodu tekrar gönder {timer > 0 && `(${timer})`}
                  </Button>
                </Popconfirm>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default inject('store')(observer(VerifyView)
