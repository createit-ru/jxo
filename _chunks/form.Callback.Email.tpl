{extends 'email.Tpl'}

{block 'title'}
    Заказ обратного звонка
{/block}
                                    
{block 'content'}
<p style="{$style.p}">
    <span style="{$style.label}">Телефон:</span> {$phone}
</p>
<p style="{$style.p}">
    <span style="{$style.label}">Комментарий:</span> {$comment}
</p>
{if $currentUrl}
    <div style="{$style.hr}"></div>
    <p style="{$style.p}">Сообщение отправлено со страницы <a href="{$currentUrl}" target="_blank">{$currentUrl}</a></p>
{/if}
{/block}