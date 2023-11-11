import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CategoryRoute } from './routes/categories.route';
import { ManufactureRoute } from './routes/manufactures.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new CategoryRoute(), new ManufactureRoute()]);

app.listen();
