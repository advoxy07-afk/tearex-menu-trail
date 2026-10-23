<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Menu data and place info live in src/lib/menu.ts; the page reads only from there so prices change in one place.
- Google map uses a keyless embed and outbound Google Maps links; no Places API. If live reviews/photos are added later, store GOOGLE_MAPS_API_KEY in Project Settings → Secrets and call it only from a server function — never in client code.
