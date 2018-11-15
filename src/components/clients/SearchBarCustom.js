import PropTypes from 'prop-types'
import React from 'react'
import { Label } from 'semantic-ui-react'
import { connect } from "react-redux";

import SearchBar from './SearchBar'

const resultRenderer = ({ title }) => <Label content={title} />;

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

const SearchBarCustom = () => (<SearchBar resultRenderer={resultRenderer} />)
export default SearchBarCustom
