import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Tabs, Tab } from '../../../ui/tabs'
import { ConfirmPageContainerSummary, ConfirmPageContainerWarning } from '.'
import ErrorMessage from '../../../ui/error-message'

export default class ConfirmPageContainerContent extends Component {
  static propTypes = {
    action: PropTypes.string,
    dataComponent: PropTypes.node,
    detailsComponent: PropTypes.node,
    errorKey: PropTypes.string,
    errorMessage: PropTypes.string,
    hideSubtitle: PropTypes.bool,
    identiconAddress: PropTypes.string,
    nonce: PropTypes.string,
    assetImage: PropTypes.string,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subtitleComponent: PropTypes.node,
    summaryComponent: PropTypes.node,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titleComponent: PropTypes.node,
    warning: PropTypes.string,
    audit: PropTypes.func,
  }

  renderContent () {
    const { detailsComponent, dataComponent } = this.props

    if (detailsComponent && dataComponent) {
      return this.renderTabs()
    } else {
      return detailsComponent || dataComponent
    }
  }

  renderTabs () {
    const { detailsComponent, dataComponent } = this.props

    return (
      <Tabs>
        <Tab name="Details">
          { detailsComponent }
        </Tab>
        <Tab name="Data">
          { dataComponent }
        </Tab>
      </Tabs>
    )
  }

  render () {
    const {
      action,
      errorKey,
      errorMessage,
      title,
      titleComponent,
      subtitle,
      subtitleComponent,
      hideSubtitle,
      identiconAddress,
      nonce,
      assetImage,
      summaryComponent,
      detailsComponent,
      dataComponent,
      warning,
      audit
    } = this.props

    return (
      <div className="confirm-page-container-content">
        {
          warning && (
            <ConfirmPageContainerWarning warning={warning} />
          )
        }
        {
          summaryComponent || (
            <ConfirmPageContainerSummary
              className={classnames({
                'confirm-page-container-summary--border': !detailsComponent || !dataComponent,
              })}
              action={action}
              title={title}
              titleComponent={titleComponent}
              subtitle={subtitle}
              subtitleComponent={subtitleComponent}
              hideSubtitle={hideSubtitle}
              identiconAddress={identiconAddress}
              nonce={nonce}
              assetImage={assetImage}
            />
          )
        }
        {
          Object.keys(audit).length
            ? <div className={classnames({
              'sender-to-recipient__audit--warn': audit.status === 'warning',
              'sender-to-recipient__audit--approve': audit.status !== 'warning',
            })}>
              {`${audit.auditor}: ${audit.message}`}
            </div>
            : null
        }
        { this.renderContent() }
        {
          (errorKey || errorMessage) && (
            <div className="confirm-page-container-content__error-container">
              <ErrorMessage
                errorMessage={errorMessage}
                errorKey={errorKey}
              />
            </div>
          )
        }
      </div>
    )
  }
}
