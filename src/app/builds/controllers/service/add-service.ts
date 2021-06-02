import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { NodemailerMailProvider } from '@/infra/mail/nodemailer-mail-provider'
import { ServiceAPIKeyGenerator } from '@/infra/utils/api-key-generator'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddServiceController } from '@/presentation/controllers/service/add-service'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { NameValidator } from '@/presentation/validation/name-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbCreateServiceNotification } from '@/usecases/mail/send-notification'
import { DbAddService } from '@/usecases/service/add-service'
import { makeDecorator } from '../factory'

const requiredFieldsValidation = new RequiredFieldValidation(['name'])
const nameValidator = new NameValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, nameValidator])

const dbAddService = new DbAddService(
  new IDGenerator(),
  new ServiceAPIKeyGenerator(),
  new PgServiceRepository()
)

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env

const mailProvider = new NodemailerMailProvider({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  auth: { user: MAIL_USER, pass: MAIL_PASS }
})
const mailer = new DbCreateServiceNotification(mailProvider)

export const addServiceController = makeDecorator(
  new AddServiceController(validator, dbAddService, mailer)
)
