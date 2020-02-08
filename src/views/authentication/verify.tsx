import React, { useState } from 'react'
import request from '../../library/request'
import {
  Row,
  Col,
  Icon,
  Input,
  Button,
  Steps,
  Popconfirm,
  message
} from '../../library/ui'
import { LoginVerifyFields, LoginVerifyInputFields } from '../../types/fields'
import { Formik } from 'formik'
import { FormikResponse } from '../../types/formik'
import { inject, observer } from 'mobx-react'

import { useInterval } from '../../helpers/hooks'
import { useLocation } from 'react-router-dom'
import { ComponentProps } from '../../types/routing'

import qs from 'query-string'

const TIMER = 20

function VerifyView({ history, store }: ComponentProps) {
  const [timer, setTimer] = useState(0)
  const [waitResend, setwaitResend] = useState(false)

  const query: any = qs.parse(useLocation().search)

  const { phoneNumber, email, authyId, LanguageId }: LoginVerifyFields = {
    phoneNumber: '',
    email: '',
    authyId: '',
    LanguageId: 1,
    ...query
  }

  useInterval(
    () => {
      setTimer(timer - 1)
    },
    timer === 0 ? undefined : 1000
  )

  const sendCode = async () => {
    try {
      setwaitResend(true)
      const { data } = await request.shared.post('users/login/', {
        phoneNumber,
        email,
        LanguageId
      })
      setTimer(TIMER)
      message.success(data.message)
    } finally {
      setwaitResend(false)
    }
  }

  const onSubmit = async (
    values: LoginVerifyInputFields,
    { setSubmitting }: FormikResponse
  ) => {
    try {
      const { data } = await request.shared.post('users/login/two-factor/', {
        authyId,
        token: values.code
      })
      store.onLogin(data.token)
      history.replace('/')
    } catch (e) {
      setSubmitting(false)
    }
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
            <Formik initialValues={{ code: '' }} onSubmit={onSubmit}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Input
                        type="text"
                        name="code"
                        autoComplete="off"
                        allowClear
                        maxLength={6}
                        prefix={
                          <Icon
                            type="number"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: 0 }}>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        block
                      >
                        Next
                      </Button>
                    </Col>
                  </Row>

                  <Row type="flex" justify="center" style={{ marginBottom: 0 }}>
                    <Col>
                      <Popconfirm
                        title={`Sending code to ${phoneNumber}`}
                        onConfirm={sendCode}
                        okText="Yes"
                        cancelText="No"
                        disabled={timer > 0}
                      >
                        <Button
                          type="link"
                          icon="sync"
                          loading={waitResend}
                          disabled={timer > 0}
                        >
                          Resend code {timer > 0 && `in ${timer} seconds`}
                        </Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                </form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default inject('store')(observer(VerifyView))
