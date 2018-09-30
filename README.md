# Tale

This is a port of the [Tale theme for Jekyll](https://github.com/chesterhow/tale) to Hugo. Tale is a minimal Jekyll theme curated for storytellers. Checkout the demo [here](https://chesterhow.github.io/tale/). I did not design this theme; I only ported it from Jekyll to Hugo.

![Tale screenshot](https://raw.githubusercontent.com/EmielH/tale-hugo/master/images/screenshot.png)

## Installation

### 1. Install the theme

If your site is also under version control using git, the easiest way to install this theme is to add it as a submodule. If you have not created a git repo for your project yet, you need to run `git init` beforehand. Inside the folder of your Hugo site, run the following command.

```
git submodule add https://github.com/EmielH/tale-hugo.git themes/tale
```

Alternatively, you can clone the theme into your project.

```
git clone https://github.com/EmielH/tale-hugo.git themes/tale
```

### 2. Configure Hugo

Add the following line to `config.toml` to tell Hugo to use the theme.

```
theme = "tale"
```

Alternatively, you can tell Hugo to use the theme with the `server` command.

```
hugo server -t tale
```

### Additional information

For more information, read the official [setup guide](https//gohugo.io/overview/installing/) of Hugo.

### Update the theme

If you have installed the theme as a git submodule, you can update the theme by issuing the following command inside your project folder.

```
git submodule update --remote --rebase
```

If you have cloned the theme, you can run `git pull` inside the theme folder.

## Configuration

### Internationalisation (i18n)

Tale supports using other languages than English. Language files for the texts Tale uses are provided in the `i18n` directory. The default language is English. To swith languages, add the key `defaultContentLanguage` to your `config.toml` file. For example:

```
defaultContentLanguage = "nl"
```

To translate texts your site uses, add an `i18n` folder to your site.

Feel free to submit pull requests for other translations of Tale's texts.

[Hugo documentation for multilingual sites](//gohugo.io/content-management/multilingual/)

## Acknowledgments

Thanks 

- to [Chester How](//github.com/chesterhow) for creating the original [Tale theme for Jekyll](https://chesterhow.github.io/tale/),
- to [onedrawingperday](//github.com/onedrawingperday), [bep](//github.com/bep) and [digitalcraftsman](//github.com/digitalcraftsman) for their help in getting the theme working correctly with Hugo,
- to [lucperkins](https://github.com/lucperkins) for the [Fresh theme](https://github.com/lucperkins/hugo-fresh) from which I used some useful snippets of code.

## License
See [LICENSE](https://github.com/EmielH/tale-hugo/blob/master/LICENSE).