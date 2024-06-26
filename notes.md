# CS260 Notebook
### Alex Snow

## 1/11/24
Today we did a GitHub assignment, and I learned how simple merge conflicts can be to solve. Merge conflicts always feel scary because it's almost like Git itself is telling you something is wrong with your code or with your process. That doesn't seem to be the case. Merge conflicts can actually be quite simple. 


## 1/17/24 
Today I set up my server on AWS. I learned how to SSH into the server using a private key. Even though we won't be using that very much in the course, it helps me feel in control of my own server. I also learned how to set up an instance that has a static IP address. I've worked with AWS before, so I know how convenient a static IP is.


## 1/22/24
Today I got HTTPS working on my server. What a good feeling! I've had my own website before, but only through services like website builders (Weebly, etc) and Netlify. I really like having complete control of how my webiste looks to the internet, even being able to set up subdomains. I learned that Let's Encrypt is even easier than I thought; it's just as simple as using a service that has Let's Encrypt compatibility built in. I like it! 


## 2/5/24
The last week I have been creating the HTML for my webpage. It has been fun working with multiple HTML files.

Buttons by default do not have any functionality, but they do react visually to the user clicking on them.

head and header are different. Head is where you put information about the website, like the title, character set, and viewport size. To change the viewport size, use the *content* tag. 

For the third party service, I will be calling a random number generator, which will be used in the function of the game. 


## 2/14/24 JS Arrays
Arrays are defined with square brackets. Filter function takes a function as a parameter and filters out anything that results in a false result. 


## 2/20/24 JS DOM
It is quite simple to define functions that update a specific part of the DOM, then reuse that function over and over with different data to get different results. 
Array sorting functions take a function as an argument. The function must return -1, 0, or 1 to determine sorting. Use localeCompare to compare strings in this way.


## 4/3/24 State Hooks in React
Calling the update function returned by useState also asks React to optimally re-render the page. Optimally means that it only re-renders the components that depend on the state. 
To render a React component: ```ReactDOM.render(<componentName/>, document.getElementById("id"));```
To return JSX from a component "function": ```return ( *HTML looking stuff* );```
```useEffect``` also runs every time a state changes in React. The return value of the insides of the useEffect function is a function that is called when the component is torn down. 
```React.useEffect(() => {
  console.log('rendered');
  return function cleanup() {
    console.log('cleanup');
  }
});```
In the above example, whenever state in the same component is changed, it will output "cleanup" then "rendered". On the initial render, it will not output "cleanup".
```React.useEffect(() => {

}, []);```
The above example will only run on the initial render. The braces contain a list of all the states that the useEffect will track. As such,
```React.useEffect(() => {

}, [count]);```
will only activate when "count" is updated, but will not react to any other state or parameter.
useEffect will also trigger for parameters passed into its component. 
