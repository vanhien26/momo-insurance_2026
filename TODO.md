# TODO: Convert license plate forms to lead forms (exclude /vat-chat)

Status: In progress

## Steps:
1. ✅ Create LeadCaptureForm.tsx in components/insurance/
2. ✅ Create /app/api/leads/route.ts
3. ✅ Replace ClientVehicleInfoForm → LeadCaptureForm in app/[productSlug]/[typeSlug]/page.tsx
4. ✅ Replace in app/[productSlug]/[typeSlug]/[seoParam]/page.tsx
5. ✅ Replace in app/[productSlug]/[typeSlug]/dong-xe/[brandSlug]/[modelSlug]/page.tsx

6. ⏳ Update app/[productSlug]/[typeSlug]/mua/page.tsx to single lead form
7. ⏳ Update app/[productSlug]/[typeSlug]/mua/[providerSlug]/[tierId]/page.tsx to single lead form
8. 🔄 Test: Run `npm run dev`, check pages, API calls
9. Update this file with completion
10. attempt_completion

Next: Step 3
