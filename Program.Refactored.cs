using savage.Components;
using SaVaGe.Middleware.ComponentProcessors;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

string? origins = "origins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(origins, policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ============================================================
// REFACTORED: Register Component Processors
// ============================================================
// Register all custom component processors
// Components without a registered processor will use auto-mapping (query params → mustache templates)
builder.Services.AddScoped<IComponentProcessor, DialogBoxProcessor>();
builder.Services.AddScoped<IComponentProcessor, ParentContainerProcessor>();
builder.Services.AddScoped<IComponentProcessor, GameSceneProcessor>();
// Add more processors here as you create them:
// builder.Services.AddScoped<IComponentProcessor, YourCustomProcessor>();

// Register the processor registry (auto-discovers all IComponentProcessor implementations)
builder.Services.AddScoped<ComponentProcessorRegistry>();
// ============================================================

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

// The fact that this exists makes me feel good we're not the first to try
// REFACTORED: Now uses convention-based routing!
app.UseDynamicJavaScript();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
