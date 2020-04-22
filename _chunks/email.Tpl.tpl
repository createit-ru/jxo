{var $style = [
'logo' => 'display:block;margin: auto;',
'a' => 'color:#348eda;',
'label' => 'font-weight:bold;',
'hr' => 'height:0;border-top:solid 1px #999;margin: 25px 0;',
'p' => 'font-family: Arial;color: #333333;font-size: 14px;',
'h' => 'font-family:Arial;color: #111111;font-weight: 400;line-height: 1.2em;margin: 30px 0 10px 0;',
'h1' => 'font-size: 28px;margin-bottom: 25px;',
'h2' => 'font-size: 24px;',
'h3' => 'font-size: 18px;font-weight:bold;color: #555555;',
'content' => 'margin: 20px 0;'
'th' => 'font-family: Arial;text-align: left;color: #111111;',
'td' => 'font-family: Arial;text-align: left;color: #111111;',
]}

{var $site_url = ('site_url' | option) | preg_replace : '#/$#' : ''}
{var $assets_url = 'assets_url' | option}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{'site_name' | option}</title>
</head>
<body style="margin:0;padding:0;background:#f6f6f6;">
<div style="height:100%;padding-top:20px;background:#f6f6f6;">
    {block 'logo'}
        <a href="{$site_url}" target="_blank">
            <img style="{$style.logo}"
                 src="{$site_url}{$assets_url}tpl/email/logo.svg"
                 alt="{$site_url}"
                 width="252" height="77"/>
        </a>
    {/block}
    <!-- body -->
    <table class="body-wrap" style="padding:0 20px 20px 20px;width: 100%;background:#f6f6f6;margin-top:10px;">
        <tr>
            <td></td>
            <td class="container" style="border:1px solid #f0f0f0;background:#ffffff;width:800px;margin:auto;">
                <div class="content">
                    <table style="width:100%;">
                        <tr>
                            <td style="padding: 20px 30px;">
                                <h1 style="{$style.h}{$style.h1}">
                                    {block 'title'}
                                        Заголовок письма
                                    {/block}
                                </h1>

                                <div style="{$style.content}">
                                {block 'content'}
                                    
                                {/block}
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- /content -->
            </td>
            <td></td>
        </tr>
    </table>
    <!-- /body -->
    <!-- footer -->
    <table style="clear:both !important;width: 100%;">
        <tr>
            <td></td>
            <td class="container">
                <!-- content -->
                <div class="content">
                    <table style="width:100%;text-align: center;">
                        <tr>
                            <td align="center">
                                <p style="{$style.p}">
                                    {block 'footer'}
                                    <a href="{$site_url}" style="color: #999999;" target="_blank">
                                        {'site_name' | option}
                                    </a>
                                    {/block}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- /content -->
            </td>
            <td></td>
        </tr>
    </table>
    <!-- /footer -->
</div>
</body>
</html>