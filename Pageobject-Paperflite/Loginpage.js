
import { Actions } from '../Utils-Paperflite/Actions';
import { Assertions } from '../Utils-Paperflite/assertions';
export class Loginpage{

//constructor
constructor(page)
{

    this.page=page;
    this.username = page.getByPlaceholder('Enter your username');
    this.continuebtn=page.getByRole('button', { name: 'Continue' });
    this.password = page.getByPlaceholder('Enter your password')
    this.loginBtn = page.getByRole('button', { name: 'LOGIN' });
    this.logo=page.getByRole('img', { name: 'Company Logo' });
}

//actions

async loginprocess(usernamevalue,passwordvalue){
    await Actions.fill(this.username,usernamevalue);
    await Actions.click(this.continuebtn);
    await Assertions.shouldBeVisible(this.password);
    await Actions.fill(this.password,passwordvalue);
    await Actions.click(this.continuebtn);
}
async verifyLoginSuccess(){

    await Assertions.shouldBeVisible(this.logo);
}


}