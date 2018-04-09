import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'
// import './global-styles.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { injectGlobal } from 'styled-components'


const TemplateWrapper = ({ children, location }) => (
  <div>
    <Header path={location.pathname} />
    <Helmet
      defaultTitle="SparkPost Developers"
      titleTemplate="%s - SparkPost"
      meta={[
        {
          name: 'description',
          content:
            'The SparkPost Developer Hub is a collection of resources to help you succeed with SparkPost – the email delivery and analytics service for developers. What will you build?',
        },
        { name: 'keywords', content: 'SparkPost' },
      ]}
    />
    {children()}
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
