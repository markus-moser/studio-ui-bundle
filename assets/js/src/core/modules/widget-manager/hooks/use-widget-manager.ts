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

import { useAppDispatch } from '@Pimcore/app/store'
import {
  openMainWidget as openMainWidgetAction,
  openBottomWidget as openBottomWidgetAction,
  openLeftWidget as openLeftWidgetAction,
  openRightWidget as openRightWidgetAction,
  closeWidget as closeWidgetAction,
  setActiveWidgetById,
  type WidgetManagerTabConfig
} from '../widget-manager-slice'

interface useWidgetManagerReturn {
  openMainWidget: (tabConfig: WidgetManagerTabConfig) => void
  openBottomWidget: (tabConfig: WidgetManagerTabConfig) => void
  openLeftWidget: (tabConfig: WidgetManagerTabConfig) => void
  openRightWidget: (tabConfig: WidgetManagerTabConfig) => void
  switchToWidget: (id: string) => void
  closeWidget: (id: string) => void
}

export const useWidgetManager = (): useWidgetManagerReturn => {
  const dispatch = useAppDispatch()

  function openMainWidget (tabConfig: WidgetManagerTabConfig): void {
    dispatch(openMainWidgetAction(tabConfig))
  }

  function openBottomWidget (tabConfig: WidgetManagerTabConfig): void {
    dispatch(openBottomWidgetAction(tabConfig))
  }

  function openLeftWidget (tabConfig: WidgetManagerTabConfig): void {
    dispatch(openLeftWidgetAction(tabConfig))
  }

  function openRightWidget (tabConfig: WidgetManagerTabConfig): void {
    dispatch(openRightWidgetAction(tabConfig))
  }

  function switchToWidget (id: string): void {
    dispatch(setActiveWidgetById(id))
  }

  function closeWidget (id: string): void {
    dispatch(closeWidgetAction(id))
  }

  return { openMainWidget, openBottomWidget, openLeftWidget, openRightWidget, switchToWidget, closeWidget }
}
