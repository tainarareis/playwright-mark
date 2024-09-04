

# The application

Mark L is a tool to manage tasks

2.png

# Tests goals




Independent tests:
- Using mass data (fixtures/tasks.json)

# Instalation

```
yarn install

cd apps/api
yarn install
yarn db:init

cd ..
cd web
yarn install
```

# Start the application

## Run the api

```
cd apps/api
yarn dev
```

## Run the web app

```
cd apps/web
yarn dev
```

# Run tests

Run only one specific spec

```
yarn playwright test specName 
```

To open debug mode, just add the flag `--debug`

```
yarn playwright test specName --debug
```

# Finding elements

## CSS Selector

### By class

```
page.locator('.task-item')
```

### By id

### By CSS + Text 

```
page.click('css=button >> text=Create)

page.locator('css=.task-item p >> text=Create)
```




## Regular expression



Find element's class that contains "InputNewTask"

```
page.fill('input[class*=InputNewTask])
```

## Xpath

```
page.click('xpath=//button[contains(text(), "Create")]')
```




## By data-testid

```
page.getByTestId('task-item')
```

# Assertions

expect(target).toBeVisible()

```


More xpath examples

Scenario: Using xpath to find a toggle of a specific task

1.png

```
//p[text()="${taskName}"]/parent::*/button[contains(@class, "Toggle")]
```


# Differetiating regular expression x CSS x XPATH


## Regular expression



```
button[class*=Toggle]
```

## XPath

Starts with //



