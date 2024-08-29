{% hello %}

{% test var1:123 var2:321 %}

---

 {% titletag var1:123 我是内 容 var2:321 我也是 %}

 ---

 test

自闭合标签
 ---
{% bihetag var1:123 var2:321 %}

 ---
带内容块的标签
 ---
{% nobubitag var1:123 var2:321 %}This is content{% endnobubitag %}
 ---

{% nobubitag var1:123 var2:321 %}
This is 
content
{% endnobubitag %}
 ---


 
{% titletag var1:123 我是内 容 var2:321 我也是 %}

 ---
{% tagcontenttag content %}

 ---
{% contenttag %}爱了爱了{% endcontenttag %}
 ---
{% contenttag %}
爱了，
爱了，
我非常爱。
{% endcontenttag %}

---

{% github_card God-2077 %}