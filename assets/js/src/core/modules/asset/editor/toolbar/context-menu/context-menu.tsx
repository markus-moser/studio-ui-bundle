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

import { Popconfirm } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import ButtonGroup from 'antd/es/button/button-group'
import React, { useContext, useState } from 'react'
import { api } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { useTranslation } from 'react-i18next'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { id } = useContext(AssetContext)
  const { asset, removeAssetFromState } = useAssetDraft(id)
  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)

  return (
    <ButtonGroup>
      <Popconfirm
        onCancel={ onCancel }
        onConfirm={ onConfirm }
        onOpenChange={ onOpenChange }
        open={ popConfirmOpen }
        title={ t('toolbar.reload.confirmation') }
      >
        <IconButton
          icon='refresh'
        >
          {t('toolbar.reload')}
        </IconButton>
      </Popconfirm>
    </ButtonGroup>
  )

  function onOpenChange (newOpen: boolean): void {
    if (!newOpen) {
      setPopConfirmOpen(false)
      return
    }

    if (Object.keys(asset?.changes ?? {}).length > 0) {
      setPopConfirmOpen(true)
    } else {
      refreshAsset()
    }
  }

  function onConfirm (): void {
    setPopConfirmOpen(false)
    refreshAsset()
  }

  function onCancel (): void {
    setPopConfirmOpen(false)
  }

  function refreshAsset (): void {
    removeAssetFromState()
    dispatch(api.util.invalidateTags(invalidatingTags.ASSET_DETAIL_ID(id)))
  }
}
