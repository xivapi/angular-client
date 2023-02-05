'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@xivapi/angular-client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/XivapiClientModule.html" data-type="entity-link" >XivapiClientModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/XivapiService.html" data-type="entity-link" >XivapiService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Character.html" data-type="entity-link" >Character</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CharacterResponse.html" data-type="entity-link" >CharacterResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CharacterSearchResult.html" data-type="entity-link" >CharacterSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CharacterSearchResultRow.html" data-type="entity-link" >CharacterSearchResultRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CharacterVerification.html" data-type="entity-link" >CharacterVerification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassJob.html" data-type="entity-link" >ClassJob</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GearDetails.html" data-type="entity-link" >GearDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GearPiece.html" data-type="entity-link" >GearPiece</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GearSet.html" data-type="entity-link" >GearSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GrandCompany.html" data-type="entity-link" >GrandCompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoreSearchResult.html" data-type="entity-link" >LoreSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PvpTeam.html" data-type="entity-link" >PvpTeam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PvpTeamMember.html" data-type="entity-link" >PvpTeamMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XivapiCharacterOptions.html" data-type="entity-link" >XivapiCharacterOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XivapiList.html" data-type="entity-link" >XivapiList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XivapiOptions.html" data-type="entity-link" >XivapiOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XivapiRequestOptions.html" data-type="entity-link" >XivapiRequestOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XivapiSearchFilter.html" data-type="entity-link" >XivapiSearchFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XivapiSearchOptions.html" data-type="entity-link" >XivapiSearchOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});