import { IAction } from './action.interface';
import { ITemplateAction } from './action.template.interface';
export class AbstractTemplateAction implements ITemplateAction {
    primaryAction: IAction
}
