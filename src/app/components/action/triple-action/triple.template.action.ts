import { DualTemplateAction } from '../dual-action/dual-template-action';
import { AbstractTemplateAction } from '../abstract/action.template.abstract';
import {IAction} from 'app/components/action/abstract/action.interface';
export class TripleTemplateAction extends DualTemplateAction {
    tertiaryAction : IAction;
}
