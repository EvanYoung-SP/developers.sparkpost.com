import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { toArray } from 'lodash'
import Markdown from 'components/Markdown'
import Banner from 'components/Banner'
import Heading from '../Heading'
import DataStructure from './DataStructure'
import EventsTable from './EventsTable'

const EmptyHeader = styled.th`
  padding: 0;
`

const TableOverflow = styled.div`
  overflow: scroll;
`

const components = {
  h1(props) {
    return <Heading level={1} {...props} />
  },
  h2(props) {
    return <Heading level={2} {...props} />
  },
  h3(props) {
    return <Heading level={3} {...props} />
  },
  h4(props) {
    return <Heading level={4} {...props} />
  },
  h5(props) {
    return <Heading level={5} {...props} />
  },
  h6(props) {
    return <Heading level={6} {...props} />
  },
  ul(props) {
    return (
      <div className="block">
        <ul {...props} />
      </div>
    )
  },
  ol(props) {
    return (
      <div class="block">
        <ul {...props} />
      </div>
    )
  },
  table(props) {
    return (
      <div className="block">
        <TableOverflow>
          <table {...props} />
        </TableOverflow>
      </div>
    )
  },
  pre(props) {
    return (
      <div className="block">
        <pre {...props} />
      </div>
    )
  },
  p(props) {
    return !hasComponent(props) ? (
      <p {...props} className="block" />
    ) : (
      <Fragment {...props} />
    )
  },
  th(props) {
    return props.children && props.children.length > 0 ? (
      <th {...props} />
    ) : (
      <EmptyHeader />
    )
  },
  banner({ children, status }) {
    return (
      <div className="block">
        <Banner status={status}>
          <p>{children}</p>
        </Banner>
      </div>
    )
  },
  'data-structure': DataStructure,
  'message-events': () => (
    <StaticQuery
      query={graphql`
        query MessageEventsQuery {
          allMessageEvent {
            edges {
              node {
                name
                attributes
                sample
              }
            }
          }
        }
      `}
      render={data => {
        const events = data.allMessageEvent.edges.map(({ node }) => node)

        return <EventsTable events={events} />
      }}
    />
  ),
}

const componentNames = toArray(components).map(c => c.name)
const hasComponent = props =>
  (
    React.Children.map(
      props.children,
      component =>
        component.type &&
        componentNames.includes(
          component.type.displayName || component.type.name
        )
    ) || []
  ).includes(true)

const BlockMarkdown = props => <Markdown components={components} {...props} />

export default BlockMarkdown
