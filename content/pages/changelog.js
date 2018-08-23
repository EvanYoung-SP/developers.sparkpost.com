/**
 * There are two parts to the changelog: the changelog page and each change page.
 *
 * This is the changelog page. It shows all of the changes with the all details
 * collapsed.
 *
 * Each individual change is generated into it's own page using the template
 * located at src/template/changelog.js
 */

import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import { Container, Row, Column } from 'components/Grid'
import Section from 'components/Section'
import Change from 'components/Change'

const TopSection = styled.div`
  text-align: center;
  padding: 3rem 0 4rem 0;

  p {
    font-size: 1rem;
  }
`

export default props => {
  const {
    data: {
      allMarkdownRemark: { edges: changes },
    },
  } = props

  return (
    <Layout {...props}>
      <Helmet
        title={'Changelog'}
        meta={[
          {
            name: 'description',
            content: `A running log of what's new and what's been changed in SparkPost.`,
          },
        ]}
      />
      <Section light>
        <Container>
          <Row center="xs">
            <Column md={7} sm={10} xs={11}>
              <TopSection>
                <h1>Changelog</h1>
                <p>
                  A running log of what's new and what's been changed in
                  SparkPost.
                </p>
              </TopSection>
              {changes.map(({ node: change }, i) => (
                <Change key={i} change={change} />
              ))}
            </Column>
          </Row>
        </Container>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/changelog/" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          ...Change
        }
      }
    }
  }
`