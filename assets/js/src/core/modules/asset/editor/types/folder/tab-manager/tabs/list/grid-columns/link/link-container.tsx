/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Tag } from '@Pimcore/components/tag/tag'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { useStyle } from './link-container.styles'

export const LinkContainer = (props: DefaultCellProps): React.JSX.Element => {
  const { openAsset } = useAssetHelper()
  const { styles } = useStyle()

  function openAssetWidget (): void {
    if (props !== undefined) {
      const asset = props.row.original

      openAsset({
        config: {
          id: asset.id
        }
      })
    }
  }

  return (
    <div className={ [styles.link, 'default-cell__content'].join(' ') }>
      <Tag
        bordered={ false }
        color={ 'processing' }
        onClick={ openAssetWidget }
      >
        {props.getValue()}
      </Tag>
    </div>
  )
}
