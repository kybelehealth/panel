import React from 'react'
import request from '../../library/request'
import { Row, Col, Icon, Input, Button, Steps } from '../../library/ui'
import { LoginFields } from '../../types/fields'
import { Formik } from 'formik'
import { FormikResponse } from '../../types/formik'
import { inject, observer } from 'mobx-react'

import { RouteComponentProps } from 'react-router-dom'

import './style.css'

function LoginView({ history }: RouteComponentProps) {
  const onSubmit = async (
    values: LoginFields,
    { setSubmitting }: FormikResponse
  ) => {
    try {
      const { data } = await request.shared.post('users/login/', {
        ...values,
        LanguageId: 1
      })
      history.push('/verify', {
        query: {
          ...values,
          authyId: data.authyId
        }
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-layout">
      <div className="login-form">
        {/* steps */}
        <Row style={{ marginBottom: 60 }}>
          <Col span={20} offset={2}>
            <Steps current={0}>
              <Steps.Step title="Login" />
              <Steps.Step title="Verify" />
            </Steps>
          </Col>
        </Row>

        {/* form */}
        <Row>
          <Col span={24}>
            <Formik
              initialValues={{ email: '', phoneNumber: '' }}
              onSubmit={onSubmit}
            >
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
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Email address"
                        prefix={
                          <Icon
                            type="mail"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Input
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone number"
                        name="phoneNumber"
                        prefix={
                          <Icon
                            type="mobile"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: 0 }}>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isSubmitting}
                        style={{ width: '100%' }}
                        loading={isSubmitting}
                      >
                        Next
                      </Button>
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

export default inject('store')(observer(LoginView))
