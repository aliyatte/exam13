const { I } = inject();
// Add in your custom step files

Given('я нахожусь на странице регистрации', () => {
  I.amOnPage('/registration');
});

Given('я нахожусь на странице логина', () => {
  I.amOnPage('/login');
});

Given('я нахожусь на главной странице', () => {
  I.amOnPage('/');
});

Given('я нахожусь на странице добавления книги', () => {
  I.amOnPage('/books/new');
});

Then('перехожу на страницу добавления книги', () => {
  I.amOnPage('/books/new');
});

When('я заполняю поля формы:', table => {
  const tableData = table.parse().rawData;

  tableData.forEach((row) => {
    I.fillField(row[0], row[1]);
  });
});

When('я выбираю категорию', () => {
  I.selectOption('#form input[name=category]', 'Fantasy');
});


When('нажимаю на кнопку {string}', name => {
  I.click(name);
});

Then('я вижу текст {string}', text => {
  I.waitForText(text);
});

