import { AbstractTemplateAction } from '../abstract/action.template.abstract';
import {IAction} from 'app/components/action/abstract/action.interface';
export class DualTemplateAction extends AbstractTemplateAction {
    secondaryAction : IAction;
}
