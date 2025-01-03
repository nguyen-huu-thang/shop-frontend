SELECT products.category_id, categories.description, COUNT(*) AS product_count
FROM products
JOIN categories on categories.id = products.category_id
GROUP BY category_id, categories.description;

SELECT rating, count(*) as rating_count FROM public.reviews
GROUP BY rating
ORDER BY rating ASC;

select reviews.rating, reviews.product_id, products.name from reviews
join products on products.id = reviews.product_id
where reviews.rating = 4
order by products.name;

select user_permissions.user_id, user_permissions.permission_id, permissions.description from user_permissions
join permissions on permissions.id = user_permissions.permission_id
where user_permissions.user_id = 1;

select cart.user_id, cart.product_option_id, cart.quantity, product_options.price, products.name from cart
join product_options on product_options.id = cart.product_option_id
join products on products.id = product_options.product_id
where user_id = 1
order by cart.quantity;