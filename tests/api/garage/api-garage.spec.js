import {test} from "@playwright/test";


test('Підміна response body та перевірка даних на сторінці', async ({ page }) => {
    // Відкриваємо сторінку профілю
    await page.goto('/');

    // Перехоплюємо запит до профілю користувача
    await page.route('https://qauto.forstudy.space/api/v1/users/profile', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                // Тут ви підміняєте дані
                status: "success",
                data: {
                    id: 12345,
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@example.com",
                    // Додаємо або модифікуємо інші дані, якщо потрібно
                }
            }),
        });
    });
    });