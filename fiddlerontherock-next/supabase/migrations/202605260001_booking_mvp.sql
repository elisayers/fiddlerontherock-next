create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  event_type text not null check (event_type in ('public_show', 'serenade')),
  weekday int,
  start_time time,
  doors_time time,
  default_capacity int not null default 40,
  under_8_free_enabled boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_occurrences (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz not null,
  capacity int not null,
  paid_count int not null default 0,
  held_count int not null default 0,
  sold_out_override boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint event_occurrences_capacity_check check (capacity >= 0 and paid_count >= 0 and held_count >= 0 and paid_count + held_count <= capacity)
);

create table if not exists public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  show_id text not null default 'sedona-serenades',
  location_slug text not null check (location_slug in ('secret_spot', 'open_air_spot')),
  location_label text not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  duration_minutes int not null default 120,
  buffer_minutes int not null default 30,
  capacity int not null default 10,
  paid_count int not null default 0,
  held_count int not null default 0,
  package_eligibility text[] not null default array['romantic_escape','gathering','celebration'],
  sold_out_override boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint availability_slots_capacity_check check (capacity >= 0 and paid_count >= 0 and held_count >= 0 and paid_count + held_count <= capacity)
);

create table if not exists public.ticket_types (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  tier text not null check (tier in ('general', 'vip')),
  audience text not null check (audience in ('adult', 'kid_18_under', 'under_8')),
  label text not null,
  price_cents int not null,
  active boolean not null default true,
  unique (event_id, tier, audience)
);

create table if not exists public.serenades_packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  price_mode text not null check (price_mode in ('fixed', 'per_person', 'request')),
  amount_cents int not null,
  min_guests int not null,
  max_guests int not null,
  request_only boolean not null default false,
  active boolean not null default true
);

create table if not exists public.add_ons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  amount_cents int not null,
  request_only boolean not null default false,
  active boolean not null default true
);

create table if not exists public.seat_holds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid,
  show_id text not null,
  slot_kind text not null check (slot_kind in ('event_occurrence', 'availability_slot')),
  slot_id uuid not null,
  capacity_units int not null,
  expires_at timestamptz not null,
  released_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  show_id text not null,
  slot_kind text not null check (slot_kind in ('event_occurrence', 'availability_slot')),
  slot_id uuid not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'canceled', 'expired', 'refunded')),
  source_attribution text,
  customer_name text,
  customer_email text,
  customer_phone text,
  subtotal_cents int not null,
  capacity_units int not null,
  stripe_session_id text,
  stripe_payment_intent_id text,
  ghl_contact_id text,
  ghl_opportunity_id text,
  ghl_synced_at timestamptz,
  ghl_sync_error text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists orders_stripe_session_id_unique
on public.orders (stripe_session_id)
where stripe_session_id is not null;

alter table public.orders add column if not exists ghl_contact_id text;
alter table public.orders add column if not exists ghl_opportunity_id text;
alter table public.orders add column if not exists ghl_synced_at timestamptz;
alter table public.orders add column if not exists ghl_sync_error text;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  label text not null,
  quantity int not null,
  unit_amount_cents int not null,
  total_cents int not null,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'stripe',
  provider_session_id text,
  provider_payment_id text,
  status text not null default 'pending',
  amount_cents int not null,
  raw_event jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;
alter table public.events enable row level security;
alter table public.event_occurrences enable row level security;
alter table public.availability_slots enable row level security;
alter table public.ticket_types enable row level security;
alter table public.serenades_packages enable row level security;
alter table public.add_ons enable row level security;
alter table public.seat_holds enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;

create or replace function public.is_booking_admin()
returns boolean language sql stable as $$
  select exists (select 1 from public.admin_profiles where id = auth.uid());
$$;

create policy "public read active events" on public.events for select using (active = true);
create policy "public read active event occurrences" on public.event_occurrences for select using (active = true);
create policy "public read active serenades slots" on public.availability_slots for select using (active = true);
create policy "public read active ticket types" on public.ticket_types for select using (active = true);
create policy "public read active serenades packages" on public.serenades_packages for select using (active = true);
create policy "public read active add ons" on public.add_ons for select using (active = true);

create policy "admin manage profiles" on public.admin_profiles for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage events" on public.events for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage occurrences" on public.event_occurrences for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage slots" on public.availability_slots for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage ticket types" on public.ticket_types for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage packages" on public.serenades_packages for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage add ons" on public.add_ons for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage holds" on public.seat_holds for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage orders" on public.orders for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage order items" on public.order_items for all using (public.is_booking_admin()) with check (public.is_booking_admin());
create policy "admin manage payments" on public.payments for all using (public.is_booking_admin()) with check (public.is_booking_admin());

insert into public.events (slug, title, event_type, weekday, start_time, doors_time, default_capacity, under_8_free_enabled)
values
  ('one-man-symphony', 'One Man Symphony', 'public_show', 4, '17:45', '17:00', 48, true),
  ('legends-of-the-fiddle', 'Legends of the Fiddle', 'public_show', 6, '18:45', '18:30', 60, true)
on conflict (slug) do nothing;

insert into public.ticket_types (event_id, tier, audience, label, price_cents)
select e.id, t.tier, t.audience, t.label, t.price_cents
from public.events e
cross join (
  values
    ('general', 'adult', 'General Adult', 5500),
    ('vip', 'adult', 'VIP Adult', 8500),
    ('general', 'kid_18_under', 'Kids 18 and under', 2200),
    ('vip', 'kid_18_under', 'Kids 18 and under', 2200),
    ('general', 'under_8', 'Under 8 reservation', 0),
    ('vip', 'under_8', 'Under 8 reservation', 0)
) as t(tier, audience, label, price_cents)
where e.slug in ('one-man-symphony', 'legends-of-the-fiddle')
on conflict (event_id, tier, audience) do nothing;

insert into public.serenades_packages (slug, title, price_mode, amount_cents, min_guests, max_guests, request_only)
values
  ('romantic_escape', 'Romantic Escape', 'fixed', 39900, 2, 2, false),
  ('gathering', 'The Gathering', 'per_person', 14900, 3, 6, false),
  ('celebration', 'The Celebration', 'per_person', 12500, 7, 10, false),
  ('memory_package', 'Sedona Memory Package', 'request', 200000, 2, 2, true),
  ('private_event', 'Private Event', 'request', 0, 11, 99, true)
on conflict (slug) do nothing;

insert into public.add_ons (slug, title, amount_cents, request_only)
values
  ('custom_song', 'Custom violin song request', 25000, false),
  ('organic_chocolate', 'Handmade Organic Chocolate', 5000, false),
  ('spring_water', 'Artesian Spring Water', 0, false),
  ('photography', 'Professional photographer', 0, true)
on conflict (slug) do nothing;

create or replace function public.release_expired_holds()
returns int
language plpgsql
security definer
as $$
declare
  hold record;
  released_count int := 0;
begin
  for hold in
    select * from public.seat_holds
    where released_at is null
      and expires_at < now()
  loop
    if hold.slot_kind = 'event_occurrence' then
      update public.event_occurrences
      set held_count = greatest(0, held_count - hold.capacity_units)
      where id = hold.slot_id;
    else
      update public.availability_slots
      set held_count = greatest(0, held_count - hold.capacity_units)
      where id = hold.slot_id;
    end if;

    update public.seat_holds set released_at = now() where id = hold.id;
    update public.orders set status = 'expired' where id = hold.order_id and status = 'pending';
    released_count := released_count + 1;
  end loop;

  return released_count;
end;
$$;

create or replace function public.booking_place_hold(
  p_show_id text,
  p_slot_kind text,
  p_slot_id uuid,
  p_capacity_units int,
  p_subtotal_cents int,
  p_source_attribution text,
  p_items jsonb
)
returns uuid
language plpgsql
security definer
as $$
declare
  available int;
  order_id uuid;
  item jsonb;
begin
  perform public.release_expired_holds();

  if p_slot_kind = 'event_occurrence' then
    select capacity - paid_count - held_count into available
    from public.event_occurrences
    where id = p_slot_id and active = true and sold_out_override = false
    for update;
  else
    select capacity - paid_count - held_count into available
    from public.availability_slots
    where id = p_slot_id and active = true and sold_out_override = false
    for update;
  end if;

  if available is null then
    raise exception 'Selected slot is not available.';
  end if;

  if available < p_capacity_units then
    raise exception 'Not enough seats remain for this date.';
  end if;

  insert into public.orders (show_id, slot_kind, slot_id, status, source_attribution, subtotal_cents, capacity_units)
  values (p_show_id, p_slot_kind, p_slot_id, 'pending', p_source_attribution, p_subtotal_cents, p_capacity_units)
  returning id into order_id;

  for item in select * from jsonb_array_elements(p_items)
  loop
    insert into public.order_items (order_id, label, quantity, unit_amount_cents, total_cents, metadata)
    values (
      order_id,
      item->>'label',
      (item->>'quantity')::int,
      (item->>'unitAmount')::int,
      (item->>'total')::int,
      coalesce(item->'metadata', '{}'::jsonb)
    );
  end loop;

  insert into public.seat_holds (order_id, show_id, slot_kind, slot_id, capacity_units, expires_at)
  values (order_id, p_show_id, p_slot_kind, p_slot_id, p_capacity_units, now() + interval '15 minutes');

  insert into public.payments (order_id, status, amount_cents)
  values (order_id, 'pending', p_subtotal_cents);

  if p_slot_kind = 'event_occurrence' then
    update public.event_occurrences set held_count = held_count + p_capacity_units where id = p_slot_id;
  else
    update public.availability_slots set held_count = held_count + p_capacity_units where id = p_slot_id;
  end if;

  return order_id;
end;
$$;

create or replace function public.booking_confirm_stripe_order(
  p_order_id uuid,
  p_session_id text,
  p_payment_intent_id text,
  p_raw_event jsonb
)
returns void
language plpgsql
security definer
as $$
declare
  target_order public.orders%rowtype;
begin
  select * into target_order
  from public.orders
  where id = p_order_id
  for update;

  if target_order.id is null then
    raise exception 'Order not found.';
  end if;

  if target_order.status = 'paid' then
    return;
  end if;

  update public.orders
  set status = 'paid',
      stripe_session_id = p_session_id,
      stripe_payment_intent_id = p_payment_intent_id,
      paid_at = now()
  where id = p_order_id;

  update public.payments
  set status = 'paid',
      provider_session_id = p_session_id,
      provider_payment_id = p_payment_intent_id,
      raw_event = p_raw_event
  where order_id = p_order_id;

  update public.seat_holds
  set released_at = now()
  where order_id = p_order_id and released_at is null;

  if target_order.slot_kind = 'event_occurrence' then
    update public.event_occurrences
    set held_count = greatest(0, held_count - target_order.capacity_units),
        paid_count = paid_count + target_order.capacity_units
    where id = target_order.slot_id;
  else
    update public.availability_slots
    set held_count = greatest(0, held_count - target_order.capacity_units),
        paid_count = paid_count + target_order.capacity_units
    where id = target_order.slot_id;
  end if;
end;
$$;
