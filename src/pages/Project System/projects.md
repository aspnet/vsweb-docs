<properties
	       pageTitle="Projects"
	       description="Projects in Visual Studio 2015 are folder based and don't require the csproj file anymore"
	       slug="projects"
	       order="100"
	       keywords="projects, folders, profiles"
/>

## Designed to work with other tools
In previous versions of Visual Studio when working with ASP.NET projects you mostly had to perform tasks inside of Visual Studio. With the new project support for ASP.NET 5, you can use other tools, and editors, to work on your projects and Visual Studio will respect those changes.

## Folder based web projects
With ASP.NET 5 all files in your project folder are automatically included as a part of your project. If you use other tools to generate files you do not need to do anything to have included in your project. Since the ASP.NET 5 Visual Studio project file does not have any files listed in the project file this also alleviates the issues with merging project files that you may have run into in the past. This is a great addition for web developers because when developing web applications using client side task runners like gulp or grunt things should just work.

## Run/debug profiles
You can run and debug ASP.NET 5 applications just as you have been able to run and debug ASP.NET projects in previous versions of Visual Studio. In addition to this you can now create debug profiles on the properties page which enable you to configure the startup settings for the project. In debug profiles you can also configure custom environment variables which are used when running or debugging in Visual Studio.

## Browser support
Just like previous versions of Visual Studio you can easily start your web application in any browser that is installed using a dropdown on the toolbar. In addition to browsers emulators are also available. Visual Studio provides both Windows Phone and Android emulators,but you can install a lot more such as iOS emulators etc.

![Browser selector](_assets/projects-browsers.png)

