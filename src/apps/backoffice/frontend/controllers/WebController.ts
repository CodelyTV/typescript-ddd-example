import { Request, Response } from 'express';
import { validationResult, ValidationError, matchedData } from 'express-validator';

export abstract class WebController {
  protected validateRequest(req: Request): Array<ValidationError> {
    const errors = validationResult(req);
    return errors.array();
  }

  private setFlashMessage(req: Request, message: { key: string; value: string }) {
    req.flash(message.key, message.value);
  }

  protected redirectWithErrors(req: Request, res: Response, errors: ValidationError[]) {
    const validFields = this.getValidFields(req);

    errors.forEach(e => {
      this.setFlashMessage(req, { key: `errors.${e.param}`, value: e.msg });
    });

    validFields.forEach(field => {
      this.setFlashMessage(req, { key: `inputs.${field.param}`, value: field.value });
    });

    res.redirect(req.originalUrl);
  }

  protected redirectWithMessage(req: Request, res: Response, route: string, message: string) {
    this.setFlashMessage(req, { key: 'message', value: message });
    res.redirect(route);
  }

  private getValidFields(req: Request): Array<{ value: any; param: string }> {
    const validData = matchedData(req, { onlyValidData: false });
    return Object.keys(validData).map(key => ({
      param: key,
      value: validData[key]
    }));
  }

  protected render(req: Request, res: Response, template: string, data: { [key: string]: any }) {
    const flash = this.feedFlash(req, data);
    res.render(template, {
      ...data,
      ...flash
    });
  }

  private feedFlash(req: Request, data: { [key: string]: any }) {
    const rawFlash = req.flash();
    const flashResponse = Object.keys(data).reduce((flash, key) => {
      flash[`inputs.${key}`] = flash[`inputs.${key}`] || data[key];
      return flash;
    }, rawFlash);
    return {
      flash: flashResponse
    };
  }

  abstract run(req: Request, res: Response): Promise<void>;
}
