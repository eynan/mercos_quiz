import React, { Component } from 'react'
import cx from 'classnames'

import './Select.css'

class Select extends Component {
    constructor(props) {
        super(props)

        this.getListHeight = this.getListHeight.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.selectItem = this.selectItem.bind(this)
        this.setWrapperRef = this.setWrapperRef.bind(this)
        this.unselectAll = this.unselectAll.bind(this)

        this.state = {
            isOpen: false,
            runningAnimation: false,
            selectedItems: [],
            selectedQuantity: 0,
            selectedTitles: [],
            maxItems: this.props.maxItems || 5
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.selectToggle()
        }
    }

    selectToggle() {
        if(this.state.isOpen) {
            document.removeEventListener('mousedown', this.handleClickOutside)
        } else {
            document.addEventListener('mousedown', this.handleClickOutside)
        }

        this.setState({
            isOpen: !this.state.isOpen,
            runningAnimation: true
        })

        setTimeout(() => {
            this.setState({
                runningAnimation: false
            })
        }, 350)
    }

    selectItem(e, index, title) {
        var updatedItems = [],
            updatedTitles = []

        if(this.props.multiple) {
            e.stopPropagation()

            if(this.state.selectedItems.includes(index)) {
                updatedItems = this.state.selectedItems.filter(function(value) { return value !== index })
                updatedTitles = this.state.selectedTitles.filter(function(value) { return value !== title })
            } else {
                updatedItems = [...this.state.selectedItems, ...[index]]
                updatedTitles = [...this.state.selectedTitles, ...[title]]
            }
        } else {
            if(this.state.selectedItems.includes(index)) {
                updatedItems = []
                updatedTitles = []
            } else {
                updatedItems = [index]
                updatedTitles = [title]
            }
        }

        this.props.doFilter && this.props.doFilter(updatedTitles)

        this.setState({
            selectedItems: updatedItems,
            selectedQuantity: updatedItems.length,
            selectedTitles: updatedTitles,
        })
    }

    unselectAll(e) {
        e && e.stopPropagation()

        this.setState({
            selectedItems: [],
            selectedQuantity: 0,
            selectedTitles: [],
        })
    }

    getListHeight() {
        var listHeight,
            multiplier = this.props.multiple ? 41 : 34

        if(this.props.items.length <= this.state.maxItems) {
            listHeight = (this.props.items.length * multiplier) + 'px'
        } else {
            listHeight = (this.state.maxItems * multiplier) + 'px'
        }

        return this.state.isOpen ? listHeight : ''
    }

    render() {
        const {
            getListHeight,
            selectItem,
            props: { displayField, multiple },
            state: { runningAnimation, selectedItems }
        } = this

        return(
            <div
                className={cx('select-element-wrapper', this.props.multiple && 'multiple-select')}
                ref={this.setWrapperRef}
                onClick={() => this.selectToggle()}
            >
                <div tabIndex="0" className={cx('select-element-container', this.state.isOpen && 'is-open', this.props.erro ? 'erro': '')}>
                    <div className={cx('select-placeholder-container')}>
                        <p className='select-placeholder'>
                            {this.state.selectedTitles && this.state.selectedQuantity === 1 ?
                                this.state.selectedTitles[0]
                            : this.state.selectedQuantity > 1 ?
                                `${this.state.selectedQuantity} selecionados`
                            :
                                 this.props.children
                             }
                        </p>
                        <div className={cx('select-items-container', runningAnimation ? 'animating' : 'animated')} style={{ height: getListHeight()}}>
                            {this.props.items && this.props.items.map(function(item, index) {
                                var title = displayField ? item.data[displayField] : item.data.title

                                return <div
                                        className={cx('item-container', selectedItems.includes(index) && 'selected')}
                                        onClick={(e) => selectItem(e, index, title)}
                                        key={`item-container-${index}`}>
                                    {multiple && <div className='check-container'></div>}
                                    <p className='select-item'>{ title }</p>
                                </div>
                            })}
                        </div>
                        {this.props.multiple && <div className={cx('list-actions-container', this.state.selectedQuantity > 0 && 'filtering')}>
                            <button>LIMPAR</button>
                            <button>FECHAR</button>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Select
