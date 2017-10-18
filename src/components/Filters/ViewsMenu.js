import cloneDeep from 'lodash/cloneDeep'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Box } from '../Grid'
import Text from '../Text'
import FaTrash from 'react-icons/lib/fa/trash'
import FaPieChart from 'react-icons/lib/fa/pie-chart'
import DropDownButton from '../DropDownButton'
import FilterDescription from './FilterDescription'

const Wrapper = styled.div``

const UnstyledList = styled.ul`
  list-style: none;
  padding: 0 !important;
  margin: 0;
`

const PlainPanel = styled.div`
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #9b9b9b;
`

const Preview = styled(PlainPanel)`
  display: none;
  position: absolute;
  right: 230px;
  width: 300px;
  right: 100%;
  margin-right: 3px;
  top: 2px;
  padding: 15px 15px 5px;
`

const ViewListItem = styled.li`
  position: relative;
  padding: 7px 40px 7px 20px;
  &:hover {
    background-color: #f3f3f3;
  }
  & > p {
    padding-right: 20px;
  }
  & > button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2px;
    padding: 8px;
    background: none;
    border: none;
    display: none;
    cursor: pointer;
  }
  &:hover > button {
    display: block;
  }
  &:hover ${Preview} {
    display: block;
  }
`

class ViewsMenu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showViewsMenu: false
    }
  }

  loadView (view) {
    const rules = cloneDeep(view.rules)
    this.props.setRules(rules)
    this.setState({ showViewsMenu: false })
  }

  render () {
    const { views } = this.props
    const hasViews =
      views.length > 0 &&
      views.reduce((sum, item) => sum + item.data.length, 0) > 0
    return (
      <Wrapper>
        <DropDownButton
          joined
          alignRight
          noListFormat
          label={
            <span>
              <FaPieChart style={{ marginRight: 10 }} />
              Views
            </span>
          }
        >
          <Box py={1}>
            {!hasViews && (
              <Box py={2} px={3}>
                {"You haven't created any views yet"}
              </Box>
            )}
            {hasViews &&
              views.map(scope => {
                if (!scope.data || !scope.data.length) {
                  return
                }
                return (
                  <Box key={scope.key}>
                    {!!scope.title && (
                      <Text fontSize={13} ml={20} mb={2} mt={2} color='#aaa'>
                        {scope.title}
                      </Text>
                    )}
                    <UnstyledList>
                      {scope.data.map(view => (
                        <ViewListItem key={view.name}>
                          <Text m={0} onClick={() => this.loadView(view)}>
                            {view.name}
                            <br />
                            <Text m={0} fontSize={12} color='#aaa'>
                              {view.rules.length} filter{view.rules.length > 1 && 's'}
                            </Text>
                          </Text>
                          <button
                            onClick={() =>
                              this.props.deleteView(view, scope.key)}
                          >
                            <FaTrash name='trash' />
                          </button>
                          <Preview>
                            {view.rules.map(rule => (
                              <Box mb={10} key={rule.id}>
                                <FilterDescription rule={rule} />
                              </Box>
                            ))}
                          </Preview>
                        </ViewListItem>
                      ))}
                    </UnstyledList>
                  </Box>
                )
              })}
          </Box>
        </DropDownButton>
      </Wrapper>
    )
  }
}

export default ViewsMenu
