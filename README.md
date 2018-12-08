This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To run this project...
- Clone repo
- yarn
- yarn run start
- don't forget the trex file and tableau workbook (in the public folder)

To execute extension in tableau
- follow above steps to run extension locally on your machine. 
- open tableau workbook (get it from public folder of this repo)
    - NOTE: if you want to enable remote debugging, use this command in terminal to open tableau 
        *open /Applications/Tableau\ Desktop\ 2018\.2.app --args --remote-debugging-port=8696*

- copy the trex file (get it from public folder) into your "extensions" folder of the my tableau repository (likely in your documents folder). 
- Go to the Tableau window that opened when running the above command. 
- Drag the extension onto view and select the trex file from your my tableau repository\extensions folder. 
